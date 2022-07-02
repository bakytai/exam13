import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Reviews, ReviewsData } from '../models/reviews.model';

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {
  constructor(private http: HttpClient) {}

  getReviews(id: string) {
    return this.http.get<Reviews[]>(environment.apiUrl + `/reviews?place=${id}`).pipe(
      map(response => {
        return response.map(data => {
          return new Reviews(
            data._id,
            data.user,
            data.place,
            data.dateTime,
            data.message,
            data.kitchenRate,
            data.serviceRate,
            data.interiorRate
          );
        });
      })
    );
  }

  createReviews(reviewsData: ReviewsData) {
    return this.http.post<Reviews>(environment.apiUrl + '/reviews', reviewsData);
  }
}
