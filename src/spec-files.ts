import { ParsedPath } from "path";

export class SpecFiles {
  createSpecFile(file: ParsedPath, className: string): string | null {
    if (file.name.includes("component")) {
      return this.componentSpec(file, className);
    } else if (file.name.includes("service")) {
      return this.serviceSpec(file, className);
    } else if (file.name.includes("guard")) {
      return this.guardSpec(file, className);
    } else if (file.name.includes("resolver")) {
    } else if (file.name.includes("directive")) {
    } else if (file.name.includes("interceptor")) {
    }

    return null;
  }

  private guardSpec(file: ParsedPath, className: string): string {
    return "";
  }

  private serviceSpec(file: ParsedPath, className: string): string {
    return "";
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
