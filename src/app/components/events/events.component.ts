import { Event } from './../../models/Event';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @Input() events: Event[];
  @Output() deleteEvent: EventEmitter<Event> = new EventEmitter();
  @Output() updateEvent: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(event: Event) {
    this.deleteEvent.emit(event);
  }

  onUpdate(event: Event) {
    this.updateEvent.emit(event);
  }

}
