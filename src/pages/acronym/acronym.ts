import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {AcronymModel} from "../../models/acronym-model";
import {AcronymReportPage} from "../acronym-report/acronym-report";

@IonicPage()
@Component({
  selector: 'page-acronym',
  templateUrl: 'acronym.html',
})
export class AcronymPage {
  acronym: AcronymModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    this.acronym = navParams.get('acronymModel')
  }

  navigate() {
    this.iab.create(this.acronym.link, '_self').show();
  }

  report() {
    this.navCtrl.push(AcronymReportPage, {
      acronymModel: this.acronym
    })
  }

}
