import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Place, PlaceData } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  constructor(private http: HttpClient) {}

  getPlaces() {
    return this.http.get<Place[]>(environment.apiUrl + `/places`).pipe(
      map(response => {
        return response.map(data => {
          return new Place(
            data._id,
            data.user,
            data.title,
            data.description,
            data.photo,
            data.rate,
            data.kitchenRate,
            data.serviceRate,
            data.interiorRate
          );
        });
      })
    );
  }

  getPlaceInfo(id: string) {
    return this.http.get<Place>(environment.apiUrl + `/places/${id}`).pipe(
      map(data => {
        return new Place(
          data._id,
          data.user,
          data.title,
          data.description,
          data.photo,
          data.rate,
          data.kitchenRate,
          data.serviceRate,
          data.interiorRate);
      })
    );
  }

  createPlace(placeData: PlaceData) {
    const formData = new FormData();
    Object.keys(placeData).forEach(key => {
      if (placeData[key] !== null) {
        formData.append(key, placeData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/places', formData);
  }

  deletePlace(id: string) {
    return this.http.delete(environment.apiUrl + '/places/' + id);
  }
}
