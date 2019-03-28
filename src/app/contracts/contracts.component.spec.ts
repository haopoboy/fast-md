import { DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule
} from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ContractsComponent } from "./contracts.component";

describe("ContractsComponent", () => {
  let component: ContractsComponent;
  let fixture: ComponentFixture<ContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatInputModule,
        FormsModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSelectModule
      ],
      declarations: [ContractsComponent],
      providers: [DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
