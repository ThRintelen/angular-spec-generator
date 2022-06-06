import { ParsedPath } from "path";

export class MockitoFiles {
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

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
`;
  }

  private serviceSpec(file: ParsedPath, className: string): string {
    return `import { of } from "rxjs";
import { instance, mock, verify, when } from "ts-mockito";
import { ${className} } from "./${file.name}";

describe("${className}", () => {
  let service: ${className};
  let serviceMock: MyService;

  beforeEach(() => {
    serviceMock = mock(MyService);

    service = new ${className}(instance(serviceMock));
  });

  describe("Method 1", () => {
    it("should ...", () => {
      const param = "myParam";
      when(serviceMock.getData(param)).thenReturn(of([]));

      service.method();

      verify(serviceMock.getData(param)).once();
    });
  });
});`;
  }

  private componentSpec(file: ParsedPath, className: string): string {
    return `import { of } from "rxjs";
import { instance, mock, verify, when } from "ts-mockito";
import { ${className} } from "./${file.name}";

describe("${className}", () => {
  let component: ${className};
  let serviceMock: MyService;

  beforeEach(() => {
    serviceMock = mock(MyService);

    component = new ${className}(instance(serviceMock));
  });

  describe("Method 1", () => {
    it("should ...", () => {
      const param = "myParam";
      when(serviceMock.getData(param)).thenReturn(of([]));

      component.ngOnInit();

      verify(serviceMock.getData(param)).once();
    });
  });
});`;
  }
}
