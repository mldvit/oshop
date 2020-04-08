import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable, merge, zip, interval, of } from 'rxjs';
import { map, publish, tap } from 'rxjs/operators';

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
    // make COLD HOT -> making WARM operator .share() attenzione all'initial value Hey guys!

    const obs$ = Observable.create((observer: any) => {
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

    // -----------------------https://rxjs.dev/api/operators/publish

    const source$ = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(
      map(values => values[1])
    );

    source$.pipe(publish (multicasted$ =>
      merge(
        multicasted$.pipe(tap(x => this.addItem('Stream 1:' + x))),
        multicasted$.pipe(tap(x =>  this.addItem('Stream 2:' + x))),
        multicasted$.pipe(tap(x =>  this.addItem('Stream 3:' + x)))
      )
    )).subscribe();

  }

  addItem(val: any) {
    const node = document.createElement('li');
    this.renderer.setAttribute(node, 'class', 'list-group-item');
    const textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById('output').appendChild(node);
  }

}
