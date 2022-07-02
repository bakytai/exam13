import { createReducer, on } from '@ngrx/store';
import { PlacesState } from '../type';
import { fetchPlaceFailure, fetchPlaceRequest, fetchPlaceSuccess } from './places.actions';

const initialState: PlacesState = {
  places: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlaceRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlaceSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
  on(fetchPlaceFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

)
