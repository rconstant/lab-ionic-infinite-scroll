import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcronymPage } from './acronym';

@NgModule({
  declarations: [
    AcronymPage,
  ],
  imports: [
    IonicPageModule.forChild(AcronymPage),
  ],
})
export class AcronymPageModule {}
