import { Event } from './../../models/Event';
import { Component, OnInit } from '@angular/core';
import { DateModal } from './../../models/DateModal';
import * as moment from 'moment';

declare function disableScroll(): any;
declare function enableScroll(): any;
@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  selectedDate: DateModal;
  events: Event[];
  isUpdateClicked: boolean;
  eventToBeUpdated: Event;
  eventToBeUpdatedMM: string;
  eventToBeUpdatedHH: string;
  eventToBeUpdatedTS: string;

  constructor() {}

  ngOnInit(): void {
    const momentDate = moment();

    this.selectedDate = {
      day: momentDate.date(),
      month: momentDate.month() + 1,
      year: momentDate.year(),
    };

    this.events = [
      { ...new Event('fjdssafdsgsa', 'Event One', '2020-04-16', '10:30 AM') },
      { ...new Event('fjdsafdsfgsa', 'Event Two', '2020-02-11', '8:30 AM') },
      { ...new Event('fjdsaggshdsa', 'Event Three', '2020-08-19', '12:30 AM') },
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

  updateEventClicked(event: Event) {
    this.eventToBeUpdated = event;
    this.eventToBeUpdatedHH = this.eventToBeUpdated.time.split(':')[0];
    this.eventToBeUpdatedMM = this.eventToBeUpdated.time
      .split(':')[1]
      .split(' ')[0];
    this.eventToBeUpdatedTS = this.eventToBeUpdated.time
      .split(':')[1]
      .split(' ')[1];

    console.log(event);
    this.isUpdateClicked = true;
    disableScroll();
  }

  cancelUpdate() {
    this.isUpdateClicked = false;
    this.eventToBeUpdated = undefined;
    enableScroll();
  }

  onTimeSpanChange(span) {
    this.eventToBeUpdatedTS = span;
  }

  updateTheEvent() {
    if (
      (this.eventToBeUpdated.title && this.eventToBeUpdatedHH,
      this.eventToBeUpdatedMM,
      this.eventToBeUpdatedTS,
      this.eventToBeUpdated.date)
    ) {
      const updatedEvent = new Event(
        '-',
        this.eventToBeUpdated.title,
        this.eventToBeUpdated.date,
        `${this.eventToBeUpdatedHH}:${this.eventToBeUpdatedMM} ${this.eventToBeUpdatedTS}`
      );

      this.events = this.events.map(event => {
        if(event.id === this.eventToBeUpdated.id) {
          return updatedEvent;
        }
        else {
          return event;
        }
      });
    }

    this.isUpdateClicked = false;
    enableScroll();
  }
}
