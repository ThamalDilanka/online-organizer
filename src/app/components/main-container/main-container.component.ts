import { Event } from './../../models/Event';
import { Component, OnInit } from '@angular/core';
import { DateModal } from './../../models/DateModal';
import * as moment from 'moment';

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

  constructor() {}

  ngOnInit(): void {
    const momentDate = moment(); // Moment object that contain current date
    // Setting selected date to current date at the app start
    this.selectedDate = {
      day: momentDate.date(),
      month: momentDate.month() + 1,
      year: momentDate.year(),
    };

    // Sample upcomingEvents
    this.allEvents = [
      {
        ...new Event('fjdssafdsgsa', 'Event One', '2020-04-18', '10:30 AM'),
      },
      {
        ...new Event('fjdsafdsfgsa', 'Event Two', '2020-05-11', '8:30 AM'),
      },
      {
        ...new Event('fjdsaggshdsa', 'Event Three', '2020-04-17', '12:30 AM'),
      },
    ];

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
    if (this.allEvents.length !== 0) {
      let closerEvent: Event = this.allEvents[0];
      // Executes only when total event count more than one
      if (this.allEvents.length > 1) {
        let minDuration = Infinity;
        this.allEvents.forEach((event) => {
          const eventDate = moment(
            `${event.date} ${event.time}`,
            'YYYY-MM-DD hh:mm a'
          );
          const currentDuration = moment
            .duration(eventDate.diff(moment()))
            .as('seconds');
          if (currentDuration < minDuration) {
            minDuration = currentDuration;
            closerEvent = event;
          }
        });
      }

      this.nextEvent[0] = closerEvent;
      this.upcomingEvents = this.allEvents.filter(
        (event) => closerEvent.id != event.id
      );
    } else {
      this.nextEvent = [];
    }
  }
}
