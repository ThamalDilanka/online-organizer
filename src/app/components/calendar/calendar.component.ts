import { DateModal } from './../../models/DateModal';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedDate: NgbDateStruct;
  date: {year: number, month: number};

  @Output() dateChangeEvent: EventEmitter<DateModal> = new EventEmitter();

  constructor(private calendar: NgbCalendar) {
  }

  selectToday() {
    this.selectedDate = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.selectToday();
  }

  onSelectedDateChange() {
    this.dateChangeEvent.emit(this.selectedDate);
  }

}
