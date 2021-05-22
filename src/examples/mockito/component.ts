import { of } from "rxjs";
import { instance, mock, when } from "ts-mockito";

describe("CancellationDeadlineHostComponent", () => {
  let component: ClassName;
  let serviceMock: MyService;

  beforeEach(() => {
    serviceMock = mock(MyService);

    component = new ClassName(instance(serviceMock));
  });

  describe("Method 1", () => {
    it("should ...", () => {
      const param = "myParam";
      when(serviceMock.getData(param)).thenReturn(of([]));

      component.ngOnInit();

      verify(serviceMock.getData(param)).once();
    });
  });
});
