type Talk = {
  title: string,
  abstract: string,
  speaker: string
}

type TechEventBase = {
  title: string,
  description: string,
  date: Date,
  capacity: number,
  rsvp: number,
}

type Conference = TechEventBase & {
  location: string,
  price: number,
  talks: Talk[],
  kind: 'conference'
}

type Meetup = TechEventBase & {
  location: string,
  price: string,
  talks: Talk[],
  kind: 'meetup'
}

type Webinar = TechEventBase & {
  url: string,
  price?: number,
  talks: Talk,
  kind: 'webinar'
}

type TechEvent = Conference | Meetup | Webinar;

type EventKind = 'webinar' | 'conference' | 'meetup';

export { EventKind, Talk, TechEventBase, Conference, Meetup, Webinar, TechEvent };