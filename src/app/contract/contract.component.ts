import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.css"]
})
export class ContractComponent implements OnInit {
  data = {
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
      .get(`/query/v2/contractProjectV2?onlyShowMine=false&systemId=${id}`)
      .toPromise();

    page.content.forEach(row => {
      row.customer = row.currently.customer[0];
      row.contract = row.currently.adsContract[0];
      this.data = row;
    });
  }
}
