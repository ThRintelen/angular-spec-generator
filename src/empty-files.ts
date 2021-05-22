import { ParsedPath } from "path";

export class EmptyFiles {
  createSpecFile(file: ParsedPath, className: string): string | null {
    if (file.name.includes("component")) {
      return this.componentSpec(file, className);
    } else if (
      file.name.includes("service") ||
      file.name.includes("guard") ||
      file.name.includes("resolver") ||
      file.name.includes("interceptor") ||
      file.name.includes("directive")
    ) {
      return this.serviceSpec(file, className);
    } else if (file.name.includes("pipe")) {
      return this.pipeSpec(file, className);
    }

    return null;
  }

  private pipeSpec(file: ParsedPath, className: string): string {
    return `import { ${className} } from "./${file.name}";

describe('${className}', () => {
  let pipe: ${className};

  beforeEach(() => {
    pipe = new ${className}();
  })
});
`;
  }

  private serviceSpec(file: ParsedPath, className: string): string {
    return `import { of } from "rxjs";
import { instance, mock, verify, when } from "ts-mockito";
import { ${className} } from "./${file.name}";

describe("${className}", () => {
  let service: ${className};
});`;
  }

  private componentSpec(file: ParsedPath, className: string): string {
    return `import { of } from "rxjs";
import { instance, mock, verify, when } from "ts-mockito";
import { ${className} } from "./${file.name}";

describe("${className}", () => {
  let component: ${className};
});`;
  }
}
