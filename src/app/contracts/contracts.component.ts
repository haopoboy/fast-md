import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-contracts",
  templateUrl: "./contracts.component.html",
  styleUrls: ["./contracts.component.css"]
})
export class ContractsComponent implements OnInit {
  page: any = {
    content: []
  };
  customerTypeName;
  state;
  searchTerm = "";
  startDate;
  endDate;
  loading = false;

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit() {
    this.findAll();
  }

  async findAll(event: PageEvent = { pageIndex: 0, pageSize: 30, length: 0 }) {
    try {
      this.loading = true;
      this.page.content = [];
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.page = await this.findData(event);
    } catch (err) {
      window.alert(err);
    } finally {
      this.loading = false;
    }
  }

  async findData(event?: PageEvent) {
    let customerTypeNameQuery = "";
    if (this.state) {
      customerTypeNameQuery = `&customerTypeNames=${this.customerTypeName}`;
    }
    let stateQuery = "";
    if (this.state) {
      stateQuery = `&states=${this.state}`;
    }
    const startString = this.startDate
      ? `&startDate=${this.datePipe.transform(this.startDate, "yyyy-MM-dd")}`
      : "";
    const endString = this.endDate
      ? `&endDate=${this.datePipe.transform(this.endDate, "yyyy-MM-dd")}`
      : "";

    let pagingString = "";
    if (event) {
      pagingString = `&page=${event.pageIndex}&size=${event.pageSize}`;
    }
    const page: any = await this.http
      .get(
        `${
          environment.apiBaseUrl
        }/query/v2/contractProjectV2?onlyShowMine=false&onlyShowAdwords=true&q=${
          this.searchTerm
        }${customerTypeNameQuery}${stateQuery}${startString}${endString}${pagingString}`
      )
      .toPromise();

    page.content.forEach(row => {
      row.customer = row.currently.customer[0];
      row.contract = row.currently.adsContract[0];
    });

    return page;
  }

  onPageChange(event: PageEvent) {
    this.findAll(event);
  }
}
