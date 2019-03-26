import { DatePipe } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContractComponent } from "./contract/contract.component";
import { ContractsComponent } from "./contracts/contracts.component";
import { HttpInterceptorImpl } from "./HttpInterceptorImpl";
import { ReceitpsComponent } from "./receitps/receitps.component";

@NgModule({
  declarations: [
    AppComponent,
    ContractsComponent,
    ReceitpsComponent,
    ContractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorImpl,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: "zh-TW" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
