import { DateModal } from './../../models/DateModal';
import { Event } from './../../models/Event';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

@Component({
  selector: 'app-event-input',
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.css'],
})
export class EventInputComponent implements OnInit {
  @Input() selectedDate: DateModal;
  @Output() addNewEvent: EventEmitter<Event> = new EventEmitter();

  eventTitle: string;
  eventHour: number;
  eventMinute: number;
  eventTimeSpan: string;
  error: string;

  constructor() {}

  ngOnInit(): void {
    this.eventTimeSpan = 'AM';
  }

  onTimeSpanChange(span: string) {
    this.eventTimeSpan = span;
  }

  onSubmit() {
    if (this.validateInputs()) {
      const newEvent = new Event(
        uuid(),
        this.eventTitle,
        `${this.selectedDate.year}-${
          this.selectedDate.month < 10
            ? '0' + this.selectedDate.month
            : this.selectedDate.month
        }-${this.selectedDate.day}`,
        `${this.eventHour}:${this.eventMinute} ${this.eventTimeSpan}`
      );

      // Emit the add event
      this.addNewEvent.emit(newEvent);

      // Reset input fields
      this.error = undefined;
      this.eventTitle = '';
      this.eventHour = undefined;
      this.eventMinute = undefined;
    }
  }

  // Input validations
  validateInputs() {
    const eventTime = moment(
      `${this.selectedDate.year}-${
        this.selectedDate.month < 10
          ? '0' + this.selectedDate.month
          : this.selectedDate.month
      }-${this.selectedDate.day} ${this.eventHour}:${this.eventMinute} ${
        this.eventTimeSpan
      }`,
      'YYYY-MM-DD hh:mm a'
    );
    if (!this.eventTitle) {
      this.error = 'oops! you forgot to enter the title';
      return false;
    } else if (!(this.eventHour || this.eventMinute)) {
      this.error = 'You forgot to enter the time. Please enter the time';
      return false;
    } else if (isNaN(this.eventHour) || isNaN(this.eventMinute)) {
      this.error = 'You entered invalid type for the time. Please check again';
      return false;
    } else if (this.eventHour > 12 || this.eventHour < 1) {
      this.error =
        'You entered invalid input for hour (HH). Please check again';
      return false;
    } else if (this.eventMinute >= 60 || this.eventMinute < 0) {
      this.error =
        'You entered invalid input for minutes (MM). Please check again';
      return false;
    } else if (eventTime.isBefore(moment())) {
      this.error = `You entered past date for the event. You can change the date by calendar`;
      return false;
    } else {
      this.error = undefined;
      return true;
    }
  }
}
