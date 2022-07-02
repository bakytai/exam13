import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/type';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { fetchPlaceRequest } from '../../store/places/places.actions';
import { createImageRequest, fetchImagesRequest } from '../../store/images/image.actions';
import { Image, ImageData } from '../../models/image.model';
import { Reviews } from '../../models/reviews.model';
import { fetchReviewsRequest } from '../../store/reviews/reviews.actions';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-info-place',
  templateUrl: './info-place.component.html',
  styleUrls: ['./info-place.component.sass']
})
export class InfoPlaceComponent implements OnInit {
  @ViewChild('reviewForm') formReview!: NgForm;
  @ViewChild('formImage') imageForm!: NgForm;

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
  reviewsCreateFailure: Observable<string | null>;

  user: Observable<null | User>;
  ratingNumber = [1,2,3,4,5];
  placeId!: string;

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

    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.placeId = this.route.snapshot.params['id'];
    this.store.dispatch(fetchPlaceRequest({id: this.placeId}));
    this.store.dispatch(fetchImagesRequest({id: this.placeId}));
    this.store.dispatch(fetchReviewsRequest({id: this.placeId}));


    this.place.subscribe(place => {
      this.placeInfo = <Place>place
    });
  }

  createReview() {

  }

  addImage() {
    const imageData: ImageData = this.imageForm.value;
    imageData.place = this.placeId;
    this.store.dispatch(createImageRequest({imageData}));
  }
}
