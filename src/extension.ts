import Q = require("q");
import * as vscode from "vscode";
import { FileHandler } from "./file-handler";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const test = vscode.commands.registerCommand(
    "angular-spec-generator.generateSpecFile",
    (event) => {
      const fileHandler = new FileHandler();

      // TODO Readme aufbertein
      // TODO Wenn mehrere Classen existieren?
      // TODO Tests<

      fileHandler
        .readFile(event.fsPath)
        .then(fileHandler.getClassName)
        .then((className) => fileHandler.createFile(event.fsPath, className))
        .then(fileHandler.openFileInEditor)
        .catch(vscode.window.showErrorMessage);
    }
  );

  context.subscriptions.push(test);
}

// this method is called when your extension is deactivated
export function deactivate() {}
