# llm-file-context-bundler

*A CLI tool to combine all TypeScript files in a directory into a single file for LLM context.*

## Description

`llm-file-context-bundler` is a command-line tool designed to recursively scan a directory for TypeScript files and combine them into a single file. This is particularly useful for preparing codebases to be processed by Large Language Models (LLMs), where providing all relevant code in a single context can enhance the model's understanding and output.

## Features

- **Recursive Scanning**: Scans the specified directory and all subdirectories for `.ts` and `.tsx` files.
- **Include/Exclude Patterns**: Allows inclusion or exclusion of files based on specified patterns.
- **Verbose Logging**: Optional verbose mode for detailed logging during execution.
- **Easy Integration**: Simple CLI interface for seamless integration into your workflow.

## Installation

Install the package globally using npm:

```bash
npm install -g llm-file-context-bundler
```

Alternatively, you can install it using pnpm:

```bash
pnpm add -g llm-file-context-bundler
```

## Usage

After installation, you can use the `llm-file-context-bundler` command in your terminal.

### Basic Command

```bash
llm-file-context-bundler -s <source_directory> -o <output_file>
```

### Options

- `-s, --source <path>`: Source directory to scan for TypeScript files. *(Default: `./src`)*
- `-o, --output <file>`: Output file to write combined content. *(Default: `./combined.ts`)*
- `-e, --exclude <patterns>`: Comma-separated list of patterns to exclude.
- `-i, --include <patterns>`: Comma-separated list of patterns to include.
- `-v, --verbose`: Enable verbose logging.

### Examples

#### Combine all TypeScript files in the `src` directory and output to `combined.ts`:

```bash
llm-file-context-bundler -s ./src -o ./combined.ts
```

#### Exclude test files and node_modules:

```bash
llm-file-context-bundler -s ./src -o ./combined.ts -e "node_modules,*.test.ts,*.spec.ts"
```

#### Include only files from `components` and `utils` directories:

```bash
llm-file-context-bundler -s ./src -o ./combined.ts -i "components/*,utils/*"
```

#### Enable verbose logging for detailed output:

```bash
llm-file-context-bundler -s ./src -o ./combined.ts -v
```

## How It Works

1. **Scanning**: The tool recursively scans the specified source directory for files with `.ts` or `.tsx` extensions.
2. **Filtering**: Applies include and exclude patterns to determine which files to process.
3. **Combining**: Reads each file's content and appends it to the output file, along with a comment indicating the original file path.
4. **Output**: The combined file includes directives to disable TypeScript and ESLint checks, ensuring smooth processing by LLMs.

## Options in Detail

### `-s, --source <path>`

- **Description**: Specifies the root directory to start scanning.
- **Default**: `./src`
- **Example**:

  ```bash
  llm-file-context-bundler -s ./my-source-directory
  ```

### `-o, --output <file>`

- **Description**: Specifies the file where the combined content will be saved.
- **Default**: `./combined.ts`
- **Example**:

  ```bash
  llm-file-context-bundler -o ./my-output-file.ts
  ```

### `-e, --exclude <patterns>`

- **Description**: Comma-separated list of patterns to exclude from the scan.
- **Example**:

  ```bash
  llm-file-context-bundler -e "node_modules,*.test.ts,*.spec.ts"
  ```

### `-i, --include <patterns>`

- **Description**: Comma-separated list of patterns to include in the scan.
- **Note**: If specified, only files matching these patterns will be included.
- **Example**:

  ```bash
  llm-file-context-bundler -i "services/*,models/*"
  ```

### `-v, --verbose`

- **Description**: Enables verbose logging to provide detailed information during execution.
- **Example**:

  ```bash
  llm-file-context-bundler -v
  ```

## Use Cases

- **Preparing Code for LLM Processing**: Combine your TypeScript codebase into a single file to provide context to language models for code analysis, summarization, or transformation tasks.
- **Code Review**: Create a single file for easier code review or sharing with team members.
- **Documentation**: Aggregate code files to assist in generating documentation or code walkthroughs.

## Limitations

- The tool does not resolve dependencies or manage import/export statements. The combined file is intended for context purposes and may not be executable.
- Exclude and include patterns are based on simple string matching and may not support advanced glob patterns.

## Contributing

Contributions are welcome! If you have ideas for improvements or find bugs, please open an issue or submit a pull request on GitHub.

### Steps to Contribute

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.
2. **Clone Your Fork**: Clone your forked repository to your local machine.

   ```bash
   git clone https://github.com/your-username/llm-file-context-bundler.git
   ```

3. **Create a Branch**: Create a new branch for your feature or bugfix.

   ```bash
   git checkout -b feature/my-new-feature
   ```

4. **Make Changes**: Implement your feature or fix.
5. **Commit Changes**: Commit your changes with a descriptive message.

   ```bash
   git commit -am 'Add new feature to improve functionality'
   ```

6. **Push to GitHub**: Push your changes to your forked repository.

   ```bash
   git push origin feature/my-new-feature
   ```

7. **Create a Pull Request**: Go to the original repository and open a pull request from your branch.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Simon Orzel**

- **GitHub**: [simonorzel26](https://github.com/simonorzel26)
- **Email**: [simonorzel@gmail.com](mailto:simonorzel@gmail.com)

## Acknowledgments

- Thanks to all contributors and users who have provided feedback and support.

## Troubleshooting

If you encounter any issues, please check the following:

- **Ensure Node.js is Installed**: The tool requires Node.js version 14 or higher.
- **Permissions**: Make sure you have the necessary permissions to read the source files and write to the output file.
- **Patterns**: Verify that your include and exclude patterns are correct and do not unintentionally filter out desired files.

For further assistance, feel free to open an issue on GitHub.

## Changelog

### [1.0.0] - YYYY-MM-DD

- Initial release of `llm-file-context-bundler`.
- Features:
  - Recursive scanning of directories for `.ts` and `.tsx` files.
  - Include and exclude pattern filtering.
  - Verbose logging option.
  - Combines files into a single output file with appropriate comments.

---

*Happy coding! If you find this tool helpful, please give it a star on GitHub.*