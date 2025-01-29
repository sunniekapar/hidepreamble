import * as vscode from 'vscode';

function findPreamble(text: string) {
  const preambleRegex = /^\/\*[\s\S]*?\*\//gm;
  return preambleRegex.exec(text);
}

function findPosition(document: vscode.TextDocument, match: RegExpExecArray) {
  const startPos = document.positionAt(match.index);
  const endPos = document.positionAt(match.index + match[0].length);
  return { startPos, endPos };
}

export function activate(context: vscode.ExtensionContext) {
  const editorChangeDisposable = vscode.window.onDidChangeActiveTextEditor(
    async (editor) => {
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

      await vscode.commands.executeCommand('editor.fold', {
        levels: 1,
        direction: 'up',
        selectionLines: [startLine],
      });
    }
  );
  context.subscriptions.push(editorChangeDisposable);

  const disposable = vscode.commands.registerCommand(
    'hidepreamble.toggle',
    () => {
      vscode.window.showInformationMessage('Hello world');
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
