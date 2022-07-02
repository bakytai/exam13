import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/type';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { fetchPlaceRequest } from '../../store/places/places.actions';
import { fetchImagesRequest } from '../../store/images/image.actions';
import { Image } from '../../models/image.model';
import { Reviews } from '../../models/reviews.model';
import { fetchReviewsRequest } from '../../store/reviews/reviews.actions';

@Component({
  selector: 'app-info-place',
  templateUrl: './info-place.component.html',
  styleUrls: ['./info-place.component.sass']
})
export class InfoPlaceComponent implements OnInit {
  place: Observable<Place | null>;
  placeInfo!: Place;
  loading: Observable<boolean>;
  error: Observable<string | null>;

  gallery!: Observable<Image[]>;
  galleryLoading!: Observable<boolean>;
  galleryError!: Observable<string | null>;

  reviews!: Observable<Reviews[]>;
  reviewsLoading: Observable<boolean>;
  reviewsError: Observable<string | null>;
  reviewsCreateLoading: Observable<boolean>;
  reviewsCreateFailure: Observable<string | null>

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.place = store.select(state => state.places.place);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);

    this.gallery = store.select(state => state.images.images);
    this.galleryLoading = store.select(state => state.images.fetchLoading);
    this.galleryError = store.select(state => state.images.fetchError);

    this.reviews = store.select(state => state.reviews.reviews);
    this.reviewsLoading = store.select(state => state.reviews.fetchLoading);
    this.reviewsError = store.select(state => state.reviews.fetchError);
    this.reviewsCreateLoading = store.select(state => state.reviews.createLoading);
    this.reviewsCreateFailure = store.select(state => state.reviews.createError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlaceRequest({id: this.route.snapshot.params['id']}));
    this.store.dispatch(fetchImagesRequest({id: this.route.snapshot.params['id']}));
    this.store.dispatch(fetchReviewsRequest({id: this.route.snapshot.params['id']}));

    this.place.subscribe(place => {
      this.placeInfo = <Place>place
    });
  }
}
