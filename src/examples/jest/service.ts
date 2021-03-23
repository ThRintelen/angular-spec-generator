import { TestBed } from "@angular/core/testing";
import { ClassName } from "./${file.name}";

describe("${className}", () => {
  let service: ClassName;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassName);
  });

  describe("method1", () => {
    it("shoud ...", () => {
      expect(service).toBeTruthy();
    });

    it.todo("shoud ...");
  });
});
