import { TestBed } from "@angular/core/testing";
import { ClassName } from "./${file.name}";

describe("${className}", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ClassName],
    })
  );

  it("shoud ...", () => {
    const interceptor: ClassName = TestBed.inject(ClassName);
    expect(interceptor).toBeTruthy();
  });
});
