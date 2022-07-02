import { createAction, props } from '@ngrx/store';
import { Reviews, ReviewsData } from '../../models/reviews.model';

export const fetchReviewsRequest = createAction(
  '[Reviews] Fetch Request',
  props<{id: string}>()
);
export const fetchReviewsSuccess = createAction(
  '[Reviews] Fetch Success',
  props<{reviews: Reviews[]}>()
);
export const fetchReviewsFailure = createAction(
  '[Reviews] Fetch Failure',
  props<{error: string}>()
);

export const createReviewsRequest = createAction(
  '[Reviews] Create Request',
  props<{reviewsData: ReviewsData}>()
);
export const createReviewsSuccess = createAction(
  '[Reviews] Create Success'
);
export const createReviewsFailure = createAction(
  '[Reviews] Create Failure',
  props<{error: string}>()
);
