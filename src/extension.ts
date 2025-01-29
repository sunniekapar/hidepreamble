import * as vscode from 'vscode';

let preambleIsFolded = true;

function findPreamble(text: string) {
  const preambleRegex = /^\/\*[\s\S]*?\*\//gm;
  return preambleRegex.exec(text);
}

function findPosition(document: vscode.TextDocument, match: RegExpExecArray) {
  const startPos = document.positionAt(match.index);
  const endPos = document.positionAt(match.index + match[0].length);
  return { startPos, endPos };
}

function foldPreamble(startLine: number) {
  vscode.commands.executeCommand('editor.fold', {
    selectionLines: [startLine],
    levels: 1,
  });
}

function unfoldPreamble(startLine: number) {
  vscode.commands.executeCommand('editor.unfold', {
    selectionLines: [startLine],
    levels: 1,
  });
}

export function activate(context: vscode.ExtensionContext) {
  const editorChangeDisposable = vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (!editor) {
        return;
      }
      const document = editor.document;

      const text = document.getText();
      const match = findPreamble(text);

      if (!match) {
        return [];
      }

      const { startPos, endPos } = findPosition(document, match);

      const startLine = startPos.line;
      const endLine = endPos.line;

      const providerDisposable = vscode.languages.registerFoldingRangeProvider(
        { language: '*' },
        {
          provideFoldingRanges: (_document, _context, _token) => {
            return [new vscode.FoldingRange(startLine, endLine)];
          },
        }
      );
      context.subscriptions.push(providerDisposable);

      preambleIsFolded ? foldPreamble(startLine) : unfoldPreamble(startLine);
    }
  );
  context.subscriptions.push(editorChangeDisposable);

  const disposable = vscode.commands.registerCommand(
    'hidepreamble.toggle',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const match = findPreamble(editor.document.getText());
      if (!match) {
        return;
      }
      const { startPos } = findPosition(editor.document, match);
      const startLine = startPos.line;

      if (preambleIsFolded) {
        unfoldPreamble(startLine);
        preambleIsFolded = false;
      } else {
        foldPreamble(startLine);
        preambleIsFolded = true;
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
