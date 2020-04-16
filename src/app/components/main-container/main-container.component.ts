import { Event } from './../../models/Event';
import { Component, OnInit } from '@angular/core';
import { DateModal } from './../../models/DateModal';
import * as moment from 'moment';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  selectedDate: DateModal;
  events: Event[];

  constructor() {}

  ngOnInit(): void {
    const momentDate = moment();

    this.selectedDate = {
      day: momentDate.date(),
      month: momentDate.month() + 1,
      year: momentDate.year(),
    };

    this.events = [
      { ...new Event('fjdssafdsgsa', 'Event One', '2020.04.16', '10:30 AM') },
      { ...new Event('fjdsafdsfgsa', 'Event Two', '2020.02.11', '8:30 AM') },
      { ...new Event('fjdsaggshdsa', 'Event Three', '2020.08.19', '12:30 AM') },
    ];

    console.log(this.events);
  }

  onSelectedDateChange($event) {
    this.selectedDate = $event;
  }

  addNewEvent(event: Event) {
    this.events.push(event);
  }

  deleteEvent(event: Event) {
    this.events = this.events.filter((e) => e.id !== event.id);
  }

  updateEvent(event: Event) {
    //this.deleteEvent(event);
    this.addNewEvent(event);
  }
}
