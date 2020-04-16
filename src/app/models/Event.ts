export class Event {
    id: string;
    title: string;
    date: string;
    time: string;

    constructor(id: string, title: string, date: string, time: string) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.time = time;
    }
}