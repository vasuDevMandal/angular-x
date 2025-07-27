import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { from, interval, map, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  private destroyRef = inject(DestroyRef);
  inter!: NodeJS.Timeout;
  num  = signal(1);
  twice = computed(() => this.num() * 2 );

  customInterval$ = new Observable((subscriber) => {
    let maxValueToEmit = 0;
    
    const interval = setInterval(() => {

      if(maxValueToEmit > 5 ){
      clearInterval(interval);
      subscriber.complete();
      return;
    }

      console.log("emitting new values...");
      subscriber.next({msg: "new value",val:maxValueToEmit});
      maxValueToEmit++;
    },1000)
  })

  myObservable$ = new Observable((subscriber) =>{
    subscriber.next(1);
    subscriber.next(2);

    setTimeout(() => {
      subscriber.complete();
    },1000)
  } );

  mySubject$ = new Subject();
  

  constructor(){
      // this.inter = setInterval(() => {
      //   this.num.update((num) => num + 1 )
      //   console.log(this.num());
      //   // console.log(this.twice());
      // },1000)
      

      // effect(() => {
      //   console.log(`num is changed ${this.num()}`);
      // })

    }
  ngOnInit(): void {   
    // const sub = this.customInterval$.subscribe({
    //   next: (val) =>console.log(val),
    //   complete: () => console.log("Completed..")    
    // })

    // const subscription = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val) 
    // })
    

    const mySub = this.myObservable$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('observal complete'),
      error: (err) => console.log(err)  
    })

    

    const mySubjectSub = this.mySubject$.subscribe({
      next: (val) => console.log('A observer: ', val) 
    })

    const mySubjectSub2 = this.mySubject$.subscribe({
      next: (val) => console.log('B observer: ', val) 
    })

    this.mySubject$.next(1);

    const subjectObservable1$ = from([11,22,33])
    // const subjectObservable1$ = of(11,22,[33,56])
    subjectObservable1$.subscribe(this.mySubject$)


    this.destroyRef.onDestroy(() => {
      // subscription.unsubscribe();  
      // sub.unsubscribe(); 

      mySub.unsubscribe();

      mySubjectSub.unsubscribe();
      mySubjectSub2.unsubscribe();
    })

    // setTimeout(() => {
    //   // this.num.set(20);
    //   this.num.update((num) => num + 5 )
    //   setTimeout(() => {
    //     clearInterval(this.inter)
    //     // subscription.unsubscribe();
    //   },2000)
    // },5000)


  }

}
