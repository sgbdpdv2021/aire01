import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { Grafico02Component } from "./grafico02/grafico02.component";
import { Grafico05Component } from "./grafico05/grafico05.component";

const routes: Routes = [
  { path: "grafico02", component: Grafico02Component },
  { path: "grafico05", component: Grafico05Component },

  { path: "", redirectTo: "grafico05", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
