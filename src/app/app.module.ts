import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarComponent } from './components/calendar/calendar.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { EventsComponent } from './components/events/events.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { EventInputComponent } from './components/event-input/event-input.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MainContainerComponent,
    EventsComponent,
    EventItemComponent,
    EventInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
