import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import {AcronymModel} from "../../models/acronym-model";
import {AcronymPage} from "../acronym/acronym";
import {AcronymList} from "../../models/acronym-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  originAcronyms: AcronymList = new AcronymList(null, []);
  listAcronyms: Array<AcronymModel>;

  loader() {
    let loading = this.loadingCtrl.create({
      content: 'Chargement de la liste des Acronymes...'
    });
    loading.present();

    return loading;
  }

  ionViewDidLoad() {
    this.getAcronymFromStorage()
  }

  constructor(public navCtrl: NavController, public httpClient: HttpClient, public storage: Storage, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  getAcronymFromDB() : any {
      return this.httpClient.get('http://golf.oryzon.fr/acronyms.php');
  }

  getAcronymFromStorage() {
    let loading = this.loader();
    this.storage.get('acronym-list').then(dataStorage => {
      this.getAcronymFromDB().subscribe(data => {
        let acronymsList = data;
        if (dataStorage) {
          if (acronymsList.version != dataStorage.version) {
            this.storage.set('acronym-list', acronymsList);
            this.originAcronyms = acronymsList;
            this.listAcronyms = this.originAcronyms.list;
            let toast = this.toastCtrl.create({
              message: 'La liste des Acronymes a été mis à jour!',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        } else {
          this.storage.set('acronym-list', acronymsList);
          this.originAcronyms = acronymsList;
          this.listAcronyms = this.originAcronyms.list;
        }
        this.storage.get('acronym-list').then(data => {
          if (data.version == this.originAcronyms.version || this.originAcronyms.version == null) {
            this.originAcronyms = data;
            this.listAcronyms = this.originAcronyms.list;
          }
        });
        loading.dismiss();
      }, error => {
        this.storage.get('acronym-list').then(data => {
          this.originAcronyms = data;
          this.listAcronyms = this.originAcronyms.list;
        });
        loading.dismiss();
      });
    });
  }

  filterItems(ev: any) {
    this.listAcronyms = this.originAcronyms.list;
    let val = ev.target.value;


    if (val && val.trim() !== '') {
      this.listAcronyms = this.listAcronyms.filter(function(item: AcronymModel) {
        return item.name.toLowerCase().includes(val.toLowerCase()) || item.definition.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  onCancel(ev: any) {
    return this.originAcronyms;
  }

  acronymShowPage(acronym: AcronymModel) {
    this.navCtrl.push(AcronymPage, {
      acronymModel: acronym
    })
  }

}
