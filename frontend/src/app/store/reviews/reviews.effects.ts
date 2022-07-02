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
  fetchReviewsFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess
} from './reviews.actions';
import { ReviewsService } from '../../services/reviews.service';
import { Store } from '@ngrx/store';
import { AppState } from '../type';

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
        this.helpers.openSnackbar('Отзыв добавлен!');
      }),
      catchError(() => of(createReviewsFailure({error: 'Wrong Data'})))
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
