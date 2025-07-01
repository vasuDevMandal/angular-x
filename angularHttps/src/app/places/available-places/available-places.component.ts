import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit{

  
  private httpClient = inject(HttpClient);
  private dr = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal(false)
  private placesService = inject(PlacesService);
 
  ngOnInit(): void {
  this.isFetching.set(true);
    const subs = this.placesService.loadAvailablePlaces()
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

  onSelectPlaces(selectPlace: Place) {
    
    this.httpClient.put('http://localhost:3000/user-places',{
      placeId: selectPlace.id
    }).subscribe({
      next: (resData) => console.log(resData) 
    })
  }

}
