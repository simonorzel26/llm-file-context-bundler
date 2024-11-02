# File Combiner CLI Tool

A command-line tool to combine all files of specified types in a directory into a single file. Originally designed for combining TypeScript files for Large Language Model (LLM) context, but it can be used with any file types.


## Example Output

Given two files in the `./files` directory:

- `file1.txt`:

  ```text
  This is the content of file1.
  ```

- `file2.txt`:

  ```text
  This is the content of file2.
  ```

Running the script:

```bash
node dist/file-combiner.js -s ./files -o combined.txt -v
```

**Console Output**:

```
Application configuration:
  Source Directory: ./files
  Output File: combined.txt
  Include Patterns: []
  Exclude Patterns: []
Starting scan in directory: ./files
Found file: ./files/file1.txt
Found file: ./files/file2.txt
Reading file: ./files/file1.txt
Reading file: ./files/file2.txt
Combined files have been saved to combined.txt
```

**Contents of `combined.txt`**:

```text
// @ts-nocheck
/* eslint-disable */

// ---- ./files/file1.txt ----
This is the content of file1.

// ---- ./files/file2.txt ----
This is the content of file2.
```

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

- **Combine Files**: Merge all files of specified types from a directory into a single file.
- **Watch Mode**: Automatically recombine files when changes are detected.
- **Include/Exclude Patterns**: Filter files using include and exclude patterns.
- **Verbose Logging**: Get detailed logs of the combining process.

## Installation

1. **Clone or Download the Script**:

   Save the script as `file-combiner.ts` in your project directory.

2. **Install Dependencies**:

   ```bash
   npm install commander chokidar
   npm install @types/node @types/commander -D
   ```

3. **Ensure TypeScript is Installed**:

   If you haven't already, install TypeScript:

   ```bash
   npm install typescript -D
   npx tsc --init
   ```

## Usage

You can run the script using `ts-node` for immediate execution or compile it to JavaScript first.

### Running with ts-node

```bash
npx ts-node file-combiner.ts [options]
```

### Compiling and Running

1. **Compile the Script**:

   ```bash
   npx tsc file-combiner.ts
   ```

   This will generate `file-combiner.js` in the `./dist` directory (ensure `outDir` is set in `tsconfig.json`).

2. **Run the Compiled Script**:

   ```bash
   node dist/file-combiner.js [options]
   ```

### Options

- `-s, --source <path>`: Source directory to scan for files (default: `./src`).
- `-o, --output <file>`: Output file to write combined content (default: `./combined.txt`).
- `-e, --exclude <patterns>`: Comma-separated list of patterns to exclude.
- `-i, --include <patterns>`: Comma-separated list of patterns to include.
- `-v, --verbose`: Enable verbose logging.
- `-w, --watch`: Watch the source directory for changes.

### Examples

#### Basic Usage

Combine all files in the `src` directory into `combined.txt`:

```bash
node dist/file-combiner.js
```

#### Specify Source and Output

```bash
node dist/file-combiner.js -s ./my-files -o ./output/combined.txt
```

#### Include and Exclude Patterns

Include only `.js` files and exclude any in `node_modules`:

```bash
node dist/file-combiner.js -i ".js" -e "node_modules"
```

#### Enable Watch Mode

Automatically recombine files when changes are detected:

```bash
node dist/file-combiner.js --watch
```

#### Verbose Logging

Get detailed logs during execution:

```bash
node dist/file-combiner.js --verbose
```

## Notes

- **Not Limited to TypeScript**: Despite the original intention, this script can combine any file types. Adjust the `isFileIncluded` method if you need to filter specific file extensions.
- **Include/Exclude Patterns**: Use these options to fine-tune which files are combined. Patterns are simple substrings matched against the file paths.
- **Watch Mode**: In watch mode, the script monitors the source directory and automatically updates the combined file when changes are detected.
- **Verbose Mode**: Provides detailed logs, which can be helpful for debugging or understanding the process flow.

## License

This project is licensed under the MIT License.

---

Feel free to customize and enhance this script to better suit your needs!