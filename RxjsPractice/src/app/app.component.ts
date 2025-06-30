import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

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
    const sub = this.customInterval$.subscribe({
      next: (val) =>console.log(val),
      complete: () => console.log("Completed..")    
    })
    // const subscription = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val) 
    // })

    this.destroyRef.onDestroy(() => {
      // subscription.unsubscribe();  
      sub.unsubscribe();  
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
