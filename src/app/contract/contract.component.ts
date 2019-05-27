import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-contract-state",
  styleUrls: ["./contract.component.css"],
  template: `
    <span *ngIf="data === 'N'">新約</span>
    <span *ngIf="data === 'R'">續約</span>
    <span *ngIf="data === 'V'">作廢</span>
    <span *ngIf="data === 'D'">作廢或解約</span>
  `
})
export class ContractStateComponent implements OnInit {
  @Input()
  data = {};
  ngOnInit() {}
}

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.css"]
})
export class ContractComponent implements OnInit {
  data: any = {
    customer: {},
    contract: {}
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.findOne(params.id);
    });
  }

  ngOnInit() {}

  async findOne(id: string) {
    const page: any = await this.http
      .get(
        `${
          environment.apiBaseUrl
        }/query/v2/contractProjectV2?onlyShowMine=false&systemId=${id}`
      )
      .toPromise();

    page.content.forEach(row => {
      row.customer = row.currently.customer[0];
      row.contract = row.currently.adsContract[0];
      row.picHistories = row.currently.picHistory[0];
      row.receipts = row.currently.fundIncome;
      if (row.currently.adsFundIncome.length > 0) {
        row.receipts = row.currently.adsFundIncome;
      }
      row.budgets = row.currently.adsBudget;
      this.data = row;
    });
  }
}
