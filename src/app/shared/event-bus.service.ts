import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventData } from './event.class';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject<EventData>();

  constructor() { }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    console.log('Eso es lo que me esta llegando en el event name: --> '+eventName)
    console.log('Eso es lo que me esta llegando action any: --> '+action)
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      
      map((e: EventData) => e["value"])).subscribe(action);
  }
}