import { Person, Event } from "../lib/types";
import db from "./db";

// ==================== PERSON
export async function createPerson(person: Person): Promise<Person> {
  await db.collection("Person").doc(person.id).set(person);
  return person as Person;
}
export async function readPerson(id: string): Promise<Person> {
  const docRef = await db.collection("Person").doc(id).get();
  return docRef.data() as Person;
}

export async function updatePerson(person: Person): Promise<void> {
  await db.collection("Person").doc(person.id).update(person);
}

export async function searchByEmail(email: string): Promise<Person> {
  const personSnap = await db
    .collection("Person")
    .where("email", "==", email)
    .get();
  const persons: Person[] = personSnap.docs.map(
    (value) => value.data() as Person
  );
  return persons[0]; //AVOID MORE THAN ONE WITH SAME EMAIL
}

// ==================== EVENT
export async function searchByIds(id: string[]): Promise<Event[]> {
  const eventList = await db
    .collection("Event")
    .where("id", "in", id)
    .get();
    const events: Event[] = eventList.docs.map(
      (value) => value.data() as Event
    );
    return events;
}

export async function createEvent(event: Event): Promise<void> {
  await db.collection("Event").doc(event.id).set(event);
}

export async function readEvent(id: string): Promise<Event> {
  const docRef = await db.collection("Event").doc(id).get();
  return docRef.data() as Event;
}

export async function updateEvent(event: Event): Promise<void> {
  await db.collection("Event").doc(event.id).update(event);
}

export async function readEvents(): Promise<Event[]> {
  const eventsSnaps = await db.collection("Event").get();
  
  const events: Event[] = eventsSnaps.docs.map(
    (value) => value.data() as Event
  );
  return events;
}
