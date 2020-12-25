import { ParsedPath } from "path";

export class SpecFiles {
  createSpecFile(file: ParsedPath, className: string): string | null {
    if (file.name.includes("component")) {
      return this.componentSpec(file, className);
    } else if (
      file.name.includes("service") ||
      file.name.includes("guard") ||
      file.name.includes("resolver")
    ) {
      return this.serviceSpec(file, className);
    } else if (file.name.includes("directive")) {
      return this.directiveSpec(file, className);
    } else if (file.name.includes("interceptor")) {
      return this.interceptorSpec(file, className);
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

  private interceptorSpec(file: ParsedPath, className: string): string {
    return `import { TestBed } from '@angular/core/testing';

    import { ${className} } from "./${file.name}";

describe('${className}', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ${className}
      ]
  }));

  it('should be created', () => {
    const interceptor: ${className} = TestBed.inject(${className});
    expect(interceptor).toBeTruthy();
  });
});
`;
  }

  private directiveSpec(file: ParsedPath, className: string): string {
    return `import { ${className} } from "./${file.name}";

describe('${className}', () => {
  it('should create an instance', () => {
    const directive = new ${className}();
    expect(directive).toBeTruthy();
  });
});
`;
  }

  private serviceSpec(file: ParsedPath, className: string): string {
    return `import { TestBed } from '@angular/core/testing';

import { ${className} } from "./${file.name}";

describe("${className}", () => {
  let service: Test1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Test1Service);
  });

  describe("method1", () => {
    it("test 1", () => {
      expect(service).toBeTruthy();
    });
  });
});
`;
  }

  private componentSpec(file: ParsedPath, className: string): string {
    return `import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ${className} } from "./${file.name}";

describe("${className}", () => {
  let component: ${className};
  let fixture: ComponentFixture<${className}>;
  let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [${className}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: MyService, useValue: {} }],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
    fixture.detectChanges();

    myService = TestBed.inject(MyService);
  });

  describe("method1", () => {
    it("test 1", () => {
      expect(component).toBeTruthy();
    });
  });

  describe("method2", () => {
    it("test 2", () => {
      expect(component).toBeTruthy();
    });
  });
})`;
  }
}
