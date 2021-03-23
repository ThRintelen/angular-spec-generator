import { instance, mock, verify } from "ts-mockito";

describe("ClassName", () => {
  let service: ClassName;
  let matDialogMock: MatDialog;

  beforeEach(() => {
    serviceMock = mock(MyService);

    service = new ClassName(instance(serviceMock));
  });

  describe("Method 1", () => {
    it("should ...", () => {
      const param = "myParam";
      when(serviceMock.getData(param)).thenReturn(of([]));

      component.ngOnInit();

      verify(serviceMock.getData(param)).once();
    });
  });

  describe("Method 2", () => {
    it("should ...").todo();
  });
});
