import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  private httpClient = inject(HttpClient);
    private dr = inject(DestroyRef);
    private placeService = inject(PlacesService)
    places = signal<Place[] | undefined>(undefined);
    isFetching = signal(false);
    error = signal(false)
   
    ngOnInit(): void {
    this.isFetching.set(true);
      const subs = this.placeService.loadUserPlaces()
      .subscribe({
        next: (resData) => {
          console.log(resData.places);
          this.places.set(resData.places);
          this.isFetching.set(false);
          this.error.set(false)
        },
        complete:() => {
          this.isFetching.set(false);
        },
        error: (error) => {
          console.log(error.message);
          console.log("new error happened",error);
          this.error.set(true);
        }
      });
  
      this.dr.onDestroy(() => {
        subs.unsubscribe();
      })
      
    }
}
