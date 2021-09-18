import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/* https://ncjamieson.com/understanding-subjects/

[multicasting] is the primary use case for Subjects in RxJS.
it’s enough to know that it involves taking the notifications from a single, source observable and forwarding them to one or more destination observers. */

export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

}
