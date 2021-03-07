import { EventKind, Talk, TechEventBase, Conference, Webinar, Meetup, TechEvent } from "../../@types/types";

describe('Chapter 3 Union And Intersection Types', function () {
  let conf: Conference, talks: Talk[], serverData: TechEvent, results, expected;
  beforeEach(() => {
    serverData = {
      title: 'ScriptConf',
      date: new Date('2019-10-25'),
      capacity: 300,
      rsvp: 289,
      description: 'The feel-good JS conference',
      kind: 'conference' as const,
      price: 129,
      location: 'Central Linz',
      talks: [{
        speaker: 'Vitaly Friedman',
        title: 'Designing with Privacy in Mind',
        abstract: '...'
      }]
    };
    talks = [
      {
        title: 'Basic Javascript',
        abstract: 'Introduction to the Javascript Language',
        speaker: 'Elmer Fudd'
      },
      {
        title: 'Advanced Javascript',
        abstract: 'ES6 Features of Javascript',
        speaker: 'Bugs Bunny'
      }
    ]
    conf = {
      title: 'Nevada Javascript Conference',
      description: 'Yearly Javascript Conference for Nevada',
      date: new Date('April 1, 2022 08:00:00'),
      capacity: 3000,
      rsvp: 101,
      kind: 'conference',
      location: 'Las Vegas, Nevada',
      price: 30.00,
      talks: talks
    }
  });

  describe('Conference is an intersection with TechEventBase and custom properties', function () {
    it('returnPrice should return the conference properties', function () {
      function returnPrice(event: TechEvent): unknown  {
        let priceObj = { price: '', talks: ''};
        if (event.price) {
          if (typeof event.price === 'number') {
            priceObj.price = `Price is: ${event.price}`;
          } else {
            priceObj.price = 'It is free!';
          }
        }

        if (Array.isArray(event.talks)) {
          priceObj.talks = event.talks.map(talk => talk.title).join(', ');
        } else {
          priceObj.talks = event.talks.title;
        }
        return priceObj;
      }
      expected = { price: 'Price is: 30', talks: 'Basic Javascript, Advanced Javascript'};
      expect(returnPrice(conf)).toEqual(expected);
    });
  });
  describe('Working With Value Types', function () {
    it('should understand the type of the object', function () {
      expect(typeof serverData).toBe('object');
    });

    it('discriminated union types allow us to easily distinguish between types', function () {
      function getEventTeaser(event: TechEvent) {
        switch(event.kind) {
          case 'conference': {
            return `${event.title} (Conference), priced at ${event.price} USD.`;
          }
          case 'meetup': {
            return `${event.title} (Meetup), hosted at ${event.location}.`;
          }
          case 'webinar': {
            return `${event.title} (Webinar), available online at ${event.url}.`;
          }
          default:
            return 'I am not familiar with that kind of event.';
        }
      }

      expect(getEventTeaser(serverData)).toBe('ScriptConf (Conference), priced at 129 USD.');
    });
  });
});