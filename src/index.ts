#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { Command } from "commander";

const { readdir, readFile, writeFile } = fs.promises;
const { join, extname } = path;

const program = new Command();

// CLI setup
program
	.version("1.0.0")
	.description(
		"A CLI tool to combine all TypeScript files in a directory into a single file for LLM context.",
	)
	.option(
		"-s, --source <path>",
		"Source directory to scan for TypeScript files",
		"./src",
	)
	.option(
		"-o, --output <file>",
		"Output file to write combined content",
		"./combined.ts",
	)
	.option(
		"-e, --exclude <patterns>",
		"Comma-separated list of glob patterns to exclude",
		"",
	)
	.option(
		"-i, --include <patterns>",
		"Comma-separated list of glob patterns to include",
		"",
	)
	.option("-v, --verbose", "Enable verbose logging", false)
	.parse(process.argv);

const options = program.opts();

interface IFileScanner {
	scan(): Promise<string[]>;
}

interface IFileCombiner {
	combine(): Promise<void>;
}

class TypeScriptFileScanner implements IFileScanner {
	constructor(
		private readonly baseDir: string,
		private readonly includePatterns: string[],
		private readonly excludePatterns: string[],
		private readonly verbose: boolean,
	) {}

	public async scan(): Promise<string[]> {
		if (this.verbose) {
			console.log(`Starting scan in directory: ${this.baseDir}`);
		}
		return this.scanDirectory(this.baseDir);
	}

	private async scanDirectory(directory: string): Promise<string[]> {
		let fileList: string[] = [];
		const entries = await readdir(directory, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = join(directory, entry.name);

			if (entry.isDirectory()) {
				fileList = fileList.concat(await this.scanDirectory(fullPath));
			} else if (entry.isFile() && this.isFileIncluded(fullPath)) {
				if (this.verbose) {
					console.log(`Found TypeScript file: ${fullPath}`);
				}
				fileList.push(fullPath);
			}
		}

		return fileList;
	}

	private isFileIncluded(filePath: string): boolean {
		const extension = extname(filePath);
		const isTypeScriptFile = extension === ".ts" || extension === ".tsx";

		const matchesInclude = this.includePatterns.length
			? this.includePatterns.some((pattern) => filePath.includes(pattern))
			: true;

		const matchesExclude = this.excludePatterns.some((pattern) =>
			filePath.includes(pattern),
		);

		return isTypeScriptFile && matchesInclude && !matchesExclude;
	}
}

class FileCombiner implements IFileCombiner {
	constructor(
		private readonly filePaths: string[],
		private readonly outputFile: string,
		private readonly verbose: boolean,
	) {}

	public async combine(): Promise<void> {
		let combinedContent = "// @ts-nocheck\n/* eslint-disable */\n\n";

		for (const filePath of this.filePaths) {
			if (this.verbose) {
				console.log(`Reading file: ${filePath}`);
			}
			const fileContent = await readFile(filePath, "utf-8");
			combinedContent += `\n// ---- ${filePath} ----\n`;
			combinedContent += `${fileContent}\n`;
		}

		await writeFile(this.outputFile, combinedContent, "utf-8");
		console.log(`Combined files have been saved to ${this.outputFile}`);
	}
}

class Application {
	private fileScanner: IFileScanner;
	private fileCombiner: IFileCombiner;

	constructor() {
		const sourceDirectory = options.source;
		const outputFile = options.output;
		const verbose = options.verbose;

		const includePatterns = options.include ? options.include.split(",") : [];
		const excludePatterns = options.exclude ? options.exclude.split(",") : [];

		if (verbose) {
			console.log("Application configuration:");
			console.log(`  Source Directory: ${sourceDirectory}`);
			console.log(`  Output File: ${outputFile}`);
			console.log(`  Include Patterns: ${includePatterns}`);
			console.log(`  Exclude Patterns: ${excludePatterns}`);
		}

		this.fileScanner = new TypeScriptFileScanner(
			sourceDirectory,
			includePatterns,
			excludePatterns,
			verbose,
		);

		this.fileCombiner = new FileCombiner([], outputFile, verbose);
	}

	public async run(): Promise<void> {
		try {
			const filePaths = await this.fileScanner.scan();

			if (filePaths.length === 0) {
				console.warn("No TypeScript files found to combine.");
				return;
			}

			// Initialize the fileCombiner with filePaths
			this.fileCombiner = new FileCombiner(
				filePaths,
				options.output,
				options.verbose,
			);

			if (this.fileCombiner) {
				await this.fileCombiner.combine();
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	}
}

new Application().run();
