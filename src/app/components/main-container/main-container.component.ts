import { Event } from './../../models/Event';
import { Component, OnInit } from '@angular/core';
import { DateModal } from './../../models/DateModal';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';

// Declared functions in the util file
declare function disableScroll(): any; // Disable scrolling
declare function enableScroll(): any; // Enable scrolling
declare function getUpdatedDate(): any; // Get updated date string form update modal
@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  selectedDate: DateModal; // Bound to the selected date of calendar component
  allEvents: Event[] = []; // Contains all the events including next and upcoming events
  upcomingEvents: Event[] = []; // All the upcomingEvents contains here except next event
  nextEvent: Event[] = []; // The next event contains here
  isUpdateClicked: boolean; // Keep state of update button click of any event item component
  eventToBeUpdated: Event; // Modifying event object
  eventToBeUpdatedMM: string; // Event Time Minutes
  eventToBeUpdatedHH: string; // Event Time Hours
  eventToBeUpdatedTS: string; // Event time span (AM / PM)
  nextEventRemaining: string; // Remaining time to next event
  now: String; // Current time

  constructor() {}

  ngOnInit(): void {
    const momentDate = moment(); // Moment object that contain current date
    // Setting selected date to current date at the app start
    this.selectedDate = {
      day: momentDate.date(),
      month: momentDate.month() + 1,
      year: momentDate.year(),
    };

    // Continuously looking for event expirations to remove
    setInterval(() => {
      if (this.allEvents !== undefined) {
        this.deleteExpired();
      }
    }, 1);

    // Continuously looking for event expirations to remove
    setInterval(() => {
      this.now = moment().format('MMMM Do YYYY, h:mm:ss a');
    }, 1);

    // Sample upcomingEvents
    this.loadSample();
    this.filterAndAssign();
  }

  // Update the selected date when user click on calender component
  onSelectedDateChange($event) {
    this.selectedDate = $event;
  }

  // Adding new event to the list (CREATE)
  addNewEvent(event: Event) {
    this.allEvents.push(event);
    this.filterAndAssign();
  }

  // Update event (UPDATE)
  updateTheEvent() {
    if (
      (this.eventToBeUpdated.title && this.eventToBeUpdatedHH,
      this.eventToBeUpdatedMM,
      this.eventToBeUpdatedTS,
      this.eventToBeUpdated.date)
    ) {
      const updatedEvent = new Event(
        this.eventToBeUpdated.id,
        this.eventToBeUpdated.title,
        getUpdatedDate(),
        `${this.eventToBeUpdatedHH}:${this.eventToBeUpdatedMM} ${this.eventToBeUpdatedTS}`
      );

      this.allEvents = this.allEvents.map((event) => {
        if (event.id === this.eventToBeUpdated.id) {
          return updatedEvent;
        } else {
          return event;
        }
      });
    }

    this.eventToBeUpdated = undefined; // Clear updated cache
    this.filterAndAssign();
    this.isUpdateClicked = false;
    enableScroll();
  }

  // Delete event (DELETE)
  deleteEvent(event: Event) {
    this.allEvents = this.allEvents.filter((e) => e.id !== event.id); // Remove the object from array
    this.filterAndAssign(); // Re arrange the arry
  }

  // Remove expired events from the list
  deleteExpired() {
    this.allEvents.forEach((event) => {
      const eventDate = moment(
        `${event.date} ${event.time}`,
        'YYYY-MM-DD hh:mm a'
      );

      if (eventDate.isBefore(moment())) {
        this.deleteEvent(event);
      }
    });
  }

  // Sort upcoming events based on duration
  sortEvents(events: Event[]) {
    let i: number, j: number;
    const n = events.length;
    // Bubble sort
    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - i - 1; j++) {
        const jDate = moment(
          `${events[j].date} ${events[j].time}`,
          'YYYY-MM-DD hh:mm a'
        );
        const jNextDate = moment(
          `${events[j + 1].date} ${events[j + 1].time}`,
          'YYYY-MM-DD hh:mm a'
        );
        if (jDate.isAfter(jNextDate)) {
          const temp: Event = events[j];
          events[j] = events[j + 1];
          events[j + 1] = temp;
        }
      }
    }

    return events;
  }

  // Fires when user click on update button of any event item to set selected event values to modify
  updateEventClicked(event: Event) {
    this.eventToBeUpdated = event;
    this.eventToBeUpdatedHH = this.eventToBeUpdated.time.split(':')[0];
    this.eventToBeUpdatedMM = this.eventToBeUpdated.time
      .split(':')[1]
      .split(' ')[0];
    this.eventToBeUpdatedTS = this.eventToBeUpdated.time
      .split(':')[1]
      .split(' ')[1];

    this.isUpdateClicked = true;
    disableScroll();
  }

  // Fires when user click the cancel button of the update model or out side
  cancelUpdate() {
    this.isUpdateClicked = false;
    this.eventToBeUpdated = undefined;
    enableScroll();
  }

  // Listen to the time span change. Fires when user change the time span of the update modal
  onTimeSpanChange(span) {
    this.eventToBeUpdatedTS = span;
  }

  // Filter events and assigns to upcoming events and next event
  filterAndAssign() {
    if (this.allEvents.length !== undefined) {
      const sortedEvents = [...this.sortEvents(this.allEvents)];
      this.nextEvent[0] = sortedEvents.shift(); // Remove first element and assign it as next event
      this.upcomingEvents = [...sortedEvents]; // Assign remaining arry to upcoming events
      setInterval(() => {
        if (typeof this.nextEvent[0] !== 'undefined') {
          this.nextEventRemaining = moment(
            `${this.nextEvent[0].date} ${this.nextEvent[0].time}`,
            'YYYY-MM-DD hh:mm a'
          ).calendar();
        }
      }, 1);
    }
  }

  // Returns sample events
  loadSample() {
    this.allEvents = [
      {
        ...new Event(
          uuid(),
          'Office Meeting',
          moment().add(7, 'days').format('YYYY-MM-DD'),
          '8:30 AM'
        ),
      },
      {
        ...new Event(
          uuid(),
          "Lillian's Birthday Party",
          moment().add(3, 'days').format('YYYY-MM-DD'),
          '7:00 PM'
        ),
      },
      {
        ...new Event(
          uuid(),
          'Cricket tournament',
          moment().add(5, 'days').format('YYYY-MM-DD'),
          '6:45 PM'
        ),
      },
    ];

    console.log(this.allEvents);
  }
}
