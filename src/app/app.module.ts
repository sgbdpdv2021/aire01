import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HighchartsChartModule } from "highcharts-angular";
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { Grafico02Component } from './grafico02/grafico02.component';
import { Grafico05Component } from './grafico05/grafico05.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    Grafico02Component,
    Grafico05Component
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/grafico05'}],
  bootstrap: [AppComponent]
})
export class AppModule {}
