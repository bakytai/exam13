import { createAction, props } from '@ngrx/store';
import { Place, PlaceData } from '../../models/place.model';

export const fetchPlacesRequest = createAction(
  '[Places] Fetch Request');
export const fetchPlacesSuccess = createAction(
  '[Places] Fetch Success',
  props<{places: Place[]}>()
);
export const fetchPlacesFailure = createAction(
  '[Places] Fetch Failure',
  props<{error: string}>()
);

export const fetchPlaceRequest = createAction(
  '[Place] Fetch Request',
  props<{id: string}>()
  );
export const fetchPlaceSuccess = createAction(
  '[Place] Fetch Success',
  props<{place: Place}>()
);
export const fetchPlaceFailure = createAction(
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
  props<{id: string}>()
);
export const deletePlaceSuccess = createAction(
  '[Place] Delete Success'
);
export const deletePlaceFailure = createAction(
  '[Place] Delete Failure',
  props<{error: string}>()
);
