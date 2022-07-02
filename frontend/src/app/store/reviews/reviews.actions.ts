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

export const deleteReviewRequest = createAction(
  '[Place] Delete Request',
  props<{id: string, place: string}>()
);
export const deleteReviewSuccess = createAction(
  '[Place] Delete Success'
);
export const deleteReviewFailure = createAction(
  '[Place] Delete Failure',
  props<{error: string}>()
);
