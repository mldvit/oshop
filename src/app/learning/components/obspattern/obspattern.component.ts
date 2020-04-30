import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable, merge, zip, interval, of, fromEvent, Subject, BehaviorSubject, ReplaySubject, from} from 'rxjs';
import { map, publish, tap, pluck } from 'rxjs/operators';
import { fromRef } from '@angular/fire/database';

@Component({
  selector: 'app-obspattern',
  templateUrl: './obspattern.component.html',
  styleUrls: ['./obspattern.component.sass']
})

export class ObspatternComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
/*     const obs$ = Observable.create(function f(observer: any) {
      observer.next('Hey guys!');
    }); */
    // creo una sorgente che emette stream
    // create crea COLD obs
    // obs$ set of callback (next, error, complete)
    // COLD OBS the producer is activated by the subscription
    // HOT the producer is emitting values *outside* of the observable
    // make COLD HOT -> making WARM operator  attenzione all'initial value Hey guys!  .share() old version  publish new
    // subject is just a different type of obs with different capabilities, a special type of obs
    // subject in contrast to an observable is simply an obser that's 
    // also able to emit values, so its both an observable and an observer simultaneously
    // 3 kind of obs  - behavior, emet l'ultimo valore ad ogni nuova subscription
    //  - replay any designated number of value , within a time
    //  - async emit only the very last value and will do so once completed called upon subjec

    // operator
    // simply methods that you can use on obs (and subjects) that allow you to change the original obs in some manner
    // and return a new obs, these operators do not change the exiting obs, they simply modify and return a new one
    // pure functions that do not modify the variable outside of its scope
    // static -> to create
    // instance

    // Marble diagrams



// --------------------

  /*    const obs$ = Observable.create((observer: any) => {
      try {
        observer.next('Hey guys!');
        observer.next('How are you?');
        setInterval(() => {
          observer.next('I am good!');
        }, 2000);
 //     observer.complete();
 //     observer.next('This will not send');
      } catch (err) {
        observer.error(err);
      }
    }); // .share();

    const observer = obs$.subscribe((res: any) => {
      this.addItem(res);
      console.log(res);
    },
      (error: any) => this.addItem(error),
      () => this.addItem('Completed')
    );

    const observer2 = obs$.subscribe((res: any) => {
      this.addItem(res);
    }
    );

    observer.add(observer2); // child subscription

    setTimeout(() => { observer.unsubscribe(); }, 6001);

    setTimeout(() => {
      const observer3 = obs$.subscribe((res: any) => {
        this.addItem('Subscriber 3:' + res);
      }
      );
    }, 1000);
 */
    // -----------------------https://rxjs.dev/api/operators/publish

/*     const source$ = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(
      map(values => values[1])
    );

    source$.pipe(publish (multicasted$ =>
      merge(
        multicasted$.pipe(tap(x => this.addItem('Stream 1:' + x))),
        multicasted$.pipe(tap(x =>  this.addItem('Stream 2:' + x))),
        multicasted$.pipe(tap(x =>  this.addItem('Stream 3:' + x)))
      )
    )).subscribe();
*/

// --------------truly hot obs
/*   const obs$ = fromEvent(document, 'mousemove');

  setTimeout(() => {
    const subscription = obs$.subscribe((x) => this.addItem(x));
  }, 2000) */

  // --------------subject
  // const subject = new Subject();
 // const subject = new BehaviorSubject('First');
  /* const subject = new ReplaySubject(2);


  subject.subscribe(
    data => this.addItem('Observer 1:' + data),
    err => this.addItem(err),
    () => this.addItem('Observer 1 completed')
  );
 
  subject.next('The first thing has been sent');

  const obs2$ = subject.subscribe(
    data => this.addItem('Obs 2:' + data)
  );

  subject.next('The second thing has been sent');
  subject.next('The third thing has been sent');
  obs2$.unsubscribe();
  subject.next('obs 3 is about to subscribe');

  const obs3$ = subject.subscribe(
    data => this.addItem('Obs 3:' + data)
  );

  subject.next('The final thing has been sent'); */


   // --------------operator
   const obs$ = Observable.create((observer: any) => {
      observer.next('Hey guys!');
  });
  
  const obs2$ = Observable.create((observer: any) => {
    observer.next('How is going?');
});

  const newObs$ = merge(obs$, obs2$);

  newObs$.subscribe((x) => this.addItem(x) );

  from([{ first: 'ml', last: 'dv', age: '52'},
           { first: 'ali', last: 'dv', age: '52'},
           { first: 'toby', last: 'dv', age: '52'}]).pipe(pluck('first')).subscribe((x) => this.addItem('from obs:'+x));

  }

  addItem(val: any) {
    const node = document.createElement('li');
    this.renderer.setAttribute(node, 'class', 'list-group-item');
    const textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById('output').appendChild(node);
  }

}
