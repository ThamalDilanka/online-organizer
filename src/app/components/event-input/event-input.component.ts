import { DateModal } from './../../models/DateModal';
import { Event } from './../../models/Event';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';

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
}
