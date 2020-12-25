import * as fs from "fs";
import * as path from "path";
import * as Q from "q";
import { TextEditor, window, workspace } from "vscode";
import { SpecFiles } from "./spec-files";

export class FileHandler {
  getClassName(document: string): Q.Promise<string> {
    const match = document.match(new RegExp("class " + "(.*)" + "{"));
    const deferred = Q.defer<string>();

    let className = null;
    if (match) {
      const part = match[1].trim().split(" ");
      className = part[0];
    }

    if (!className) {
      deferred.reject(`no class forund in selected file`);
    } else {
      deferred.resolve(className);
    }

    return deferred.promise;
  }

  readFile(fileName: string): Q.Promise<string> {
    const deferred = Q.defer<string>();
    const content = fs.readFileSync(fileName, "utf-8");

    deferred.resolve(content);
    return deferred.promise;
  }

  createFile(fileName: string, className: string): Q.Promise<string> {
    const specFiles = new SpecFiles();
    const deferred = Q.defer<string>();
    const file = path.parse(fileName);
    const specFile = `${file.name}.spec${file.ext}`;
    const specFilePath = file.dir + "/" + specFile;
    const content = specFiles.createSpecFile(file, className);

    if (!content) {
      deferred.reject(
        "File type not in component, service, guard, resolver, directive or interceptor"
      );
      return deferred.promise;
    }

    fs.writeFile(specFilePath, content, (err) => {
      if (err) {
        deferred.reject(err.message);
      }
    });

    deferred.resolve(specFilePath);

    return deferred.promise;
  }

  openFileInEditor(fileUrl: string): Q.Promise<TextEditor> {
    const deferred = Q.defer<TextEditor>();

    workspace.openTextDocument(fileUrl).then((textDocument) => {
      if (!textDocument) {
        return;
      }
      window.showTextDocument(textDocument).then((editor) => {
        if (!editor) {
          return;
        }
        deferred.resolve(editor);
      });
    });

    return deferred.promise;
  }
}
