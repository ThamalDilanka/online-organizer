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
    const momentDate = moment(this.event.date, 'YYYY-MM-DD')
    this.eventDate = momentDate.format('MMMM Do YYYY');
    this.eventRelativeTime = momentDate.fromNow();
    this.eventMonth = this.eventDate.split(' ')[0];
    this.eventDay = this.eventDate.split(' ')[1].slice(0, 2);;
  }

  onDeletePress() {
    this.isDeletePressed = true;
  }

  onCancelDeletePress() {
    this.isDeletePressed = false;
  }

  onDelete(event: Event) {
    this.deleteEvent.emit(this.event);
  }

  onUpdate(event: Event) {
    this.updateEvent.emit(event);
  }

}
