import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlacesService } from '../../services/places.service';
import { fetchPlaceFailure, fetchPlaceRequest, fetchPlaceSuccess } from './places.actions';
import { AppState } from '../type';
import { HelpersService } from '../../services/helpers.service';

@Injectable()

export class PlacesEffects {
  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlaceRequest),
    mergeMap(({id}) => this.placeService.getPlaces().pipe(
      map(places => fetchPlaceSuccess({places})),
      catchError(() => of(fetchPlaceFailure({error: 'Something went wrong'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private placeService: PlacesService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}
}
