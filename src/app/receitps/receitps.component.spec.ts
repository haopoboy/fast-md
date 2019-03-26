import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReceitpsComponent } from "./receitps.component";

describe("ReceitpsComponent", () => {
  let component: ReceitpsComponent;
  let fixture: ComponentFixture<ReceitpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
