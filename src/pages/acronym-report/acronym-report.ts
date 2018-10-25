import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AcronymModel} from "../../models/acronym-model";

@Component({
  selector: 'page-acronym-report',
  templateUrl: 'acronym-report.html',
})
export class AcronymReportPage {
  acronym: AcronymModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.acronym = navParams.get('acronymModel')
  }

}
