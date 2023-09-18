import * as vscode from "vscode";
import { createFolderOrFile, getDirectoriesRecursive } from "../helpers/utils";
import { showQuickPick } from "../features/features";
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "quick-file-structure.createNestedFiles",
    () => {
      const currWorkspace =
        vscode.workspace.workspaceFolders &&
        vscode.workspace.workspaceFolders[0].uri.path;
      const suggestions = getDirectoriesRecursive(currWorkspace || "").map(
        (dir, i) => (i === 0 ? "/" : `/${vscode.workspace.asRelativePath(dir)}`)
      );
      showQuickPick(suggestions, onChange);
      vscode.window.showInformationMessage("Nested FIles!");
    }
  );

  context.subscriptions.push(disposable);
}
const onChange = (value: string) => {
  vscode.window
    .showInputBox({
      placeHolder: "newfile.txt",
      title: "Enter Folder or File Name",
      value: value,
    })
    .then((inputVal) => {
      const workspace =
        vscode.workspace.workspaceFolders &&
        vscode.workspace.workspaceFolders[0].uri.fsPath;
      const absolutePath = `${workspace}/${value}`;
      if (inputVal) {
        createFolderOrFile(absolutePath, inputVal);
      }
    });
};

export function deactivate() {}
