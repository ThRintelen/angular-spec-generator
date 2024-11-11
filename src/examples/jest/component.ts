import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClassName } from "./${file.name}";

describe("${className}", () => {
  let component: ClassName;
  let fixture: ComponentFixture<ClassName>;
  let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassName],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: MyService, useValue: {} }],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassName);
    component = fixture.componentInstance;

    myService = TestBed.inject(MyService);
  });

  describe("method1", () => {
    it("shoud ...", () => {
      expect(component).toBeTruthy();
    });
  });
});
