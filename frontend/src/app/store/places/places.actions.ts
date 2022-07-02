import { createAction, props } from '@ngrx/store';
import { Place, PlaceData } from '../../models/place.model';

export const fetchPlacesRequest = createAction(
  '[Place] Fetch Request');
export const fetchPlacesSuccess = createAction(
  '[Place] Fetch Success',
  props<{places: Place[]}>()
);
export const fetchPlacesFailure = createAction(
  '[Place] Fetch Failure',
  props<{error: string}>()
);

export const createPlaceRequest = createAction(
  '[Place] Create Request',
  props<{placeData:PlaceData}>()
);
export const createPlaceSuccess = createAction(
  '[Place] Create Success'
);
export const createPlaceFailure = createAction(
  '[Place] Create Failure',
  props<{error: string}>()
);

export const deletePlaceRequest = createAction(
  '[Place] Delete Request',
  props<{id: string, }>()
);
export const deletePlaceSuccess = createAction(
  '[Place] Delete Success'
);
export const deletePlaceFailure = createAction(
  '[Place] Delete Failure',
  props<{error: string}>()
);
