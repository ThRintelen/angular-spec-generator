import * as vscode from "vscode";
import { FileHandler } from "./file-handler";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const commandJest = vscode.commands.registerCommand(
    "angular-spec-generator.generateJestFile",
    (event) => {
      const fileHandler = new FileHandler();

      fileHandler
        .readFile(event.fsPath)
        .then(fileHandler.getClassName)
        .then((className) =>
          fileHandler.createJestFile(event.fsPath, className)
        )
        .then(fileHandler.openFileInEditor)
        .catch(vscode.window.showErrorMessage);
    }
  );

  const commandMockito = vscode.commands.registerCommand(
    "angular-spec-generator.generateMockitoFile",
    (event) => {
      const fileHandler = new FileHandler();

      fileHandler
        .readFile(event.fsPath)
        .then(fileHandler.getClassName)
        .then((className) =>
          fileHandler.createMockitoFile(event.fsPath, className)
        )
        .then(fileHandler.openFileInEditor)
        .catch(vscode.window.showErrorMessage);
    }
  );

  const commandEmpty = vscode.commands.registerCommand(
    "angular-spec-generator.generateEmptyFile",
    (event) => {
      const fileHandler = new FileHandler();

      fileHandler
        .readFile(event.fsPath)
        .then(fileHandler.getClassName)
        .then((className) =>
          fileHandler.createEmptyFile(event.fsPath, className)
        )
        .then(fileHandler.openFileInEditor)
        .catch(vscode.window.showErrorMessage);
    }
  );

  context.subscriptions.push(commandJest, commandMockito, commandEmpty);
}

// this method is called when your extension is deactivated
export function deactivate() {}
