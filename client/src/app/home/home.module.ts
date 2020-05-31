import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
