import { createReducer, on } from '@ngrx/store';
import { ReviewsState } from '../type';
import {
  createReviewsFailure,
  createReviewsRequest,
  createReviewsSuccess,
  deleteReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  fetchReviewsFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess
} from './reviews.actions';

const initialState: ReviewsState = {
  reviews: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(fetchReviewsRequest, state => ({...state, fetchLoading: true})),
  on(fetchReviewsSuccess, (state, {reviews}) => ({...state, fetchLoading: false, reviews})),
  on(fetchReviewsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createReviewsRequest, state => ({...state, createLoading: true})),
  on(createReviewsSuccess, state => ({...state, createLoading: false})),
  on(createReviewsFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deleteReviewRequest, state => ({...state, deleteLoading: true})),
  on(deleteReviewSuccess, state => ({...state, deleteLoading: false})),
  on(deleteReviewFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error})),
)
