// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  activate as nestedActivate,
  deactivate as nestedDeactivate,
} from "./commands/NestedFiles";
import {
  activate as multipleFilesActivate,
  deactivate as multipleFilesDeactivate,
} from "./commands/MultipleFiles";
import {
  activate as multipleFoldersActivate,
  deactivate as multipleFoldersDeactivate,
} from "./commands/MultipleFolders";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  console.log(
    'Congratulations, your extension "quick-file-structure" is now active!'
  );
  nestedActivate(context);
  multipleFilesActivate(context);
  multipleFoldersActivate(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
  nestedDeactivate();
  multipleFilesDeactivate();
  multipleFoldersDeactivate();
}
