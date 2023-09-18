import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { directoriesToExclude } from "./constant";

const getDirectories = (dirpath: string): string[] => {
  return fs
    .readdirSync(dirpath)
    .map((file) => path.join(dirpath, file))
    .filter(
      (pth) =>
        fs.statSync(pth).isDirectory() &&
        !directoriesToExclude.find((d) => pth.includes(d))
    );
};

export const getDirectoriesRecursive = (dirpath: string): string[] => {
  return [
    dirpath,
    ...flatten(getDirectories(dirpath).map(getDirectoriesRecursive)),
  ];
};

const flatten = <T>(arr: T[][]): T[] =>
  arr.reduce((acc, val) => acc.concat(val), []);

export const getQuickPickList = (list: string[]): { label: string }[] =>
  list.map((item) => ({ label: item }));

export const createFolderOrFile = (dir: string, fileName: string) => {
  const isDirExist = fs.existsSync(dir);
  if (isDirExist) {
    createFile(`${dir}/${fileName}`);
  } else {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        vscode.window.showErrorMessage("Something Went Wrong! We're on it");
      } else {
        createFile(`${dir}/${fileName}`);
      }
    });
  }
};

const createFile = (path: string) => {
  fs.writeFile(path, "", (err) => {
    if (err) {
      vscode.window.showErrorMessage(err.message);
    }
    vscode.workspace.openTextDocument(path).then((document) => {
      vscode.window.showTextDocument(document);
    });
    vscode.window.showInformationMessage(
      `${vscode.workspace.asRelativePath(path)} created Successfully`
    );
  });
};
