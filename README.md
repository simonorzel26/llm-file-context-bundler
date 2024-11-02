Sure! Based on your updated code and package.json, here's the rewritten README:

---

# llm-file-context-bundler

A command-line tool to combine all TypeScript/JavaScript files in a directory into a single file for Large Language Model (LLM) context. This tool helps AI code assistants like GitHub Copilot and Codeium to have full context of your codebase, leading to smarter suggestions and auto-completions.

**npm Package:** [llm-file-context-bundler](https://www.npmjs.com/package/llm-file-context-bundler)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
  - [Examples](#examples)
- [Example Output](#example-output)
- [Notes](#notes)
- [License](#license)

## Features

- **Combine Files**: Merge all TypeScript/JavaScript files from a directory into a single file.
- **Watch Mode**: Automatically recombine files when changes are detected.
- **Include/Exclude Patterns**: Filter files using include and exclude patterns.
- **Verbose Logging**: Get detailed logs of the combining process.

## Installation

Install the package globally via npm:

```bash
npm install -g llm-file-context-bundler
```

Or using Yarn:

```bash
yarn global add llm-file-context-bundler
```

Or using pnpm:

```bash
pnpm add -g llm-file-context-bundler
```

The package is available on npm: [llm-file-context-bundler](https://www.npmjs.com/package/llm-file-context-bundler)

## Usage

After installing, you can use the command `llm-file-context-bundler` in your terminal.

### Options

- `-s, --source <path>`: Source directory to scan for TypeScript files (default: `./src`).
- `-o, --output <file>`: Output file to write combined content (default: `./combined.ts`).
- `-e, --exclude <patterns>`: Comma-separated list of patterns to exclude.
- `-i, --include <patterns>`: Comma-separated list of patterns to include.
- `-v, --verbose`: Enable verbose logging.
- `-w, --watch`: Watch the source directory for changes.

### Examples

#### Basic Usage

Combine all TypeScript files in the `src` directory into `combined.ts`:

```bash
llm-file-context-bundler
```

#### Specify Source and Output

```bash
llm-file-context-bundler -s ./my-files -o ./output/combined.ts
```

#### Include and Exclude Patterns

Include only files matching `.service.ts` and exclude any in `node_modules`:

```bash
llm-file-context-bundler -i ".service.ts" -e "node_modules"
```

#### Enable Watch Mode

Automatically recombine files when changes are detected:

```bash
llm-file-context-bundler --watch
```

#### Verbose Logging

Get detailed logs during execution:

```bash
llm-file-context-bundler --verbose
```

## Example Output

Given two TypeScript files in the `./src` directory:

- `hello.ts`:

  ```typescript
  export function sayHello() {
    console.log("Hello, world!");
  }
  ```

- `goodbye.ts`:

  ```typescript
  export function sayGoodbye() {
    console.log("Goodbye, world!");
  }
  ```

Running the script:

```bash
llm-file-context-bundler -s ./src -o combined.ts -v
```

**Console Output**:

```
Application configuration:
  Source Directory: ./src
  Output File: combined.ts
  Include Patterns: []
  Exclude Patterns: []
Starting scan in directory: ./src
Found TypeScript file: ./src/hello.ts
Found TypeScript file: ./src/goodbye.ts
Reading file: ./src/hello.ts
Reading file: ./src/goodbye.ts
Combined files have been saved to combined.ts
```

**Contents of `combined.ts`**:

```typescript
// @ts-nocheck
/* eslint-disable */

// ---- ./src/hello.ts ----
export function sayHello() {
  console.log("Hello, world!");
}

// ---- ./src/goodbye.ts ----
export function sayGoodbye() {
  console.log("Goodbye, world!");
}
```

## Notes

- **Designed for TypeScript/JavaScript**: The tool is intended to combine TypeScript or JavaScript files. If you need to combine other file types, you may adjust the `isFileIncluded` method in the code.
- **Include/Exclude Patterns**: Use these options to fine-tune which files are combined. Patterns are simple substrings matched against the file paths.
- **Watch Mode**: In watch mode, the tool monitors the source directory and automatically updates the combined file when changes are detected.
- **Verbose Mode**: Provides detailed logs, which can be helpful for debugging or understanding the process flow.
- **Integration with AI Code Assistants**: Combining your project files into one allows AI code assistants like GitHub Copilot and Codeium to have full context, leading to smarter suggestions and auto-completions.

## License

This project is licensed under the MIT License.

---

Feel free to customize and enhance this tool to better suit your needs!