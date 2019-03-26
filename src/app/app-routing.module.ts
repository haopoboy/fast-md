import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractComponent } from "./contract/contract.component";
import { ContractsComponent } from "./contracts/contracts.component";
import { ReceitpsComponent } from "./receitps/receitps.component";

const routes: Routes = [
  {
    path: "contracts",
    component: ContractsComponent
  },
  {
    path: "contract/:id",
    component: ContractComponent
  },
  {
    path: "receipts",
    component: ReceitpsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
