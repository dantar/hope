import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CupOfDiceComponent } from './components/cup-of-dice/cup-of-dice.component';

@NgModule({
  declarations: [
    AppComponent,
    CupOfDiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
