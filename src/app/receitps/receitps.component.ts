import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { environment } from "src/environments/environment";
import * as moment from "moment";

@Component({
  selector: "app-receitps",
  templateUrl: "./receitps.component.html",
  styleUrls: ["./receitps.component.css"]
})
export class ReceitpsComponent implements OnInit {
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
    this.startDate = moment()
      .startOf("month")
      .toDate();
    this.endDate = new Date();
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
        `${environment.apiBaseUrl}/query/v2/receipt?q=${
          this.searchTerm
        }${startString}${endString}${pagingString}`
      )
      .toPromise();

    page.content.forEach(row => {
      row.customer = row.currently.customer[0];
      row.contract = Object.assign(
        {},
        row.currently.adsContract[0],
        row.currently.contract[0]
      );
    });

    return page;
  }

  onPageChange(event: PageEvent) {
    this.findAll(event);
  }
}
