import { ClassName } from "./${file.name}";

describe("${className}", () => {
  let pipe: ClassName;

  beforeEach(() => {
    pipe = new ClassName();
  });

  it("shoud ...", () => {
    expect(pipe).toBeTruthy();
  });

  it.todo("shoud ...");
});
