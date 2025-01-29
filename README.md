# **Hide Preamble Comments - VS Code Extension**

## **Overview**

The _Hide Preamble Comments_ extension automatically detects and folds preamble comments in your files. This helps you reduce clutter and focus on the main content of your code by hiding long, block comments at the beginning of files (such as license headers, documentation, or other metadata).

---

## **Features**

- Detects and folds preamble comments in all file types.
- Automatically folds or unfolds the preamble when a file is opened.
- Allows you to toggle the folding of preamble comments via a command.

---

## **How It Works**

1. **Detection:** The extension uses a regular expression to find preamble comments, defined as block comments starting with `/*` and ending with `*/`.
2. **Folding:** When a preamble is detected, it automatically folds the comment block when the file is opened.
3. **Toggle Command:** You can manually toggle the folding of the preamble using the command `Hide Preamble: Toggle`.

---

## **Installation**

1. Install the extension from the VS Code Marketplace (or manually from a `.vsix` package).
2. Reload or restart VS Code to activate the extension.

---

## **Usage**

### **Automatic Folding**

- When you open a file that contains a preamble comment, the extension automatically folds it.

### **Toggle Preamble Folding**

- You can toggle the folding of the preamble using the command palette:
  1. Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS).
  2. Search for `Hide Preamble: Toggle`.
  3. Run the command to fold or unfold the preamble comment.

---

## **Example**

Given the following preamble comment at the top of a file:

```javascript
/*
  This is a preamble comment.
  It might contain license information, metadata, or documentation.
*/

function example() {
  console.log('Hello, world!');
}
```

The extension will automatically detect and fold the comment block, so you only see a collapsed version when opening the file.

---

## **Commands**

| Command                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| `Hide Preamble: Toggle` | Toggles the folding of the preamble comment. |

---

## **Configuration**

This extension currently works on all file types and languages. There are no additional settings required.

---

## **Development**

The extension code is written in TypeScript and leverages the VS Code API to interact with editors and documents. Key functionalities include:

- Finding the preamble using a regex.
- Folding and unfolding the preamble using VS Code's `editor.fold` and `editor.unfold` commands.
- Registering a command (`hidepreamble.toggle`) to toggle the folding state.

---

## **Future Improvements**

- Add customizable regex patterns for detecting preamble comments.
- Support for language-specific comment styles.
- Additional commands or settings for manual folding behavior.
- Toggle copyright year and license name

---

## **Contributing**

Contributions, issues, and feature requests are welcome! Feel free to fork the repository, submit pull requests, or open issues for suggestions.

---

## **License**

This project is licensed under [MIT License](https://opensource.org/licenses/MIT).

---

Enjoy a cleaner, distraction-free coding experience with the Hide Preamble Comments extension! 🎉
