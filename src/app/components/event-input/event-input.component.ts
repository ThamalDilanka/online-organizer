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
    if (
      this.eventTitle &&
      this.eventHour &&
      this.eventMinute &&
      this.eventTimeSpan
    ) {
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

      this.addNewEvent.emit(newEvent);
    }
  }

  // Input validations
  validateInputs(event: Event) {
    if (!event.title) {
      this.error = 'oops! you forgot to enter the title';
      return false;
    } else if (moment(event.date, 'YYYY-MM-DD').isBefore(moment())) {
      this.error = 'You entered past date for the event. Please correct it!';
      return false;
    } else {
      const hour = event.time.split(':')[0];
      const minutes = event.time.split(':')[2].split(' ')[0];
      try {
        if (parseInt(hour) >= 12 || parseInt(hour) <= 0) {
          this.error =
            'You entered invalid input for hour (HH). Please check again';
          return false;
        } else if (parseInt(minutes) >= 60 || parseInt(minutes) < 0) {
          this.error =
            'You entered invalid input for minutes (MM). Please check again';
          return false;
        }
      } catch (err) {
        this.error =
          'You entered invalid type of input to the time. Please check again';
        return false;
      }
    }
    return true;
  }
}
