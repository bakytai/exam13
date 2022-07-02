import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { HelpersService } from '../../services/helpers.service';
import {
  createReviewsFailure,
  createReviewsRequest,
  createReviewsSuccess,
  deleteReviewRequest,
  deleteReviewSuccess,
  fetchReviewsFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess
} from './reviews.actions';
import { ReviewsService } from '../../services/reviews.service';
import { Store } from '@ngrx/store';
import { AppState } from '../type';
import { fetchPlaceRequest } from '../places/places.actions';
import { deleteImageFailure } from '../images/image.actions';

@Injectable()

export class ReviewsEffects {
  fetchReviews = createEffect(() => this.actions.pipe(
    ofType(fetchReviewsRequest),
    mergeMap(({id}) => this.reviewsService.getReviews(id).pipe(
      map(reviews => fetchReviewsSuccess({reviews})),
      catchError(() => of(fetchReviewsFailure({error: 'Something went wrong'})))
    ))
  ));

  createReview = createEffect(() => this.actions.pipe(
    ofType(createReviewsRequest),
    mergeMap(({reviewsData}) => this.reviewsService.createReviews(reviewsData).pipe(
      map(() => createReviewsSuccess()),
      tap(() => {
        this.store.dispatch(fetchReviewsRequest({id: reviewsData.place}));
        this.store.dispatch(fetchPlaceRequest({id: reviewsData.place}));
        this.helpers.openSnackbar('Отзыв добавлен!');
      }),
      catchError(() => of(createReviewsFailure({error: 'Wrong Data'})))
    ))
  ));


  deleteReview = createEffect(() => this.actions.pipe(
    ofType(deleteReviewRequest),
    mergeMap(({id, place}) => this.reviewsService.deleteReview(id).pipe(
      map(() => deleteReviewSuccess()),
      tap(() => {
        this.store.dispatch(fetchReviewsRequest({id: place}));
        this.helpers.openSnackbar('Review deleted!');
      }),
      catchError(() => of(deleteImageFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private reviewsService: ReviewsService,
    private helpers: HelpersService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}
}
