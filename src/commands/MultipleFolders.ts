import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  let createMultipleFolders = vscode.commands.registerCommand(
    "quick-file-structure.createMultipleFolders",
    () => {
      vscode.window.showErrorMessage("Multiple Folders!");
    }
  );

  context.subscriptions.push(createMultipleFolders);
}
export function deactivate() {}
