import { DestroyRef, inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);  
  private httpClient = inject(HttpClient);
  private dr = inject(DestroyRef);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places')
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places')
  }

  addPlaceToUserPlaces(place: Place) {}

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string){
    return this.httpClient
      .get<{places: Place[]}>(url)
  }
}
