import { createReducer, on } from '@ngrx/store';
import { PlacesState } from '../type';
import {
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess,
  deletePlaceFailure,
  deletePlaceRequest,
  deletePlaceSuccess,
  fetchPlaceFailure,
  fetchPlaceRequest,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  fetchPlaceSuccess
} from './places.actions';

const initialState: PlacesState = {
  places: [],
  place: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
  on(fetchPlacesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(fetchPlaceRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlaceSuccess, (state, {place}) => ({...state, fetchLoading: false, place})),
  on(fetchPlaceFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createPlaceRequest, state => ({...state, createLoading: true})),
  on(createPlaceSuccess, state => ({...state, createLoading: false})),
  on(createPlaceFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deletePlaceRequest, state => ({...state, deleteLoading: true})),
  on(deletePlaceSuccess, state => ({...state, deleteLoading: false})),
  on(deletePlaceFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error})),
)
