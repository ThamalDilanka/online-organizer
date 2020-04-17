import { Event } from './../../models/Event';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css'],
})
export class EventItemComponent implements OnInit {
  @Input() event: Event;
  @Output() deleteEvent: EventEmitter<Event> = new EventEmitter();
  @Output() updateEvent: EventEmitter<Event> = new EventEmitter();

  eventDate: string;
  eventRelativeTime: string;
  eventMonth: string;
  eventDay: string;

  isDeletePressed: boolean;

  constructor() {}

  ngOnInit(): void {
    const momentDate = moment(`${this.event.date} ${this.event.time}`, 'YYYY-MM-DD hh:mm a');
    this.eventDate = momentDate.format('MMMM Do YYYY');
    this.eventMonth = this.eventDate.split(' ')[0];
    this.eventDay = this.eventDate
      .split(' ')[1]
      .slice(0, 2)
      .replace(/[snrt]/g, '');

    // Continuously update the relative time
    setInterval(() => {
      this.eventRelativeTime = momentDate.fromNow();
    }, 1);
  }

  onDeletePress() {
    this.isDeletePressed = true;
  }

  onCancelDeletePress() {
    this.isDeletePressed = false;
  }

  onDelete(event: Event) {
    this.deleteEvent.emit(this.event);
    this.isDeletePressed = false;
  }

  onUpdate(event: Event) {
    this.updateEvent.emit(event);
  }
}
