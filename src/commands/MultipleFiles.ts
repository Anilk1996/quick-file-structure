import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  let createMultipleFiles = vscode.commands.registerCommand(
    "quick-file-structure.createMultipleFiles",
    () => {
      vscode.window.showWarningMessage("Multiple files!");
    }
  );

  context.subscriptions.push(createMultipleFiles);
}

export function deactivate() {}
