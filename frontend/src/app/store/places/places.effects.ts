import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlacesService } from '../../services/places.service';
import {
  createPlaceFailure,
  createPlaceRequest,
  createPlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess
} from './places.actions';

import { HelpersService } from '../../services/helpers.service';

@Injectable()

export class PlacesEffects {
  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placeService.getPlaces().pipe(
      map(places => fetchPlacesSuccess({places})),
      catchError(() => of(fetchPlacesFailure({error: 'Something went wrong'})))
    ))
  ));

  createPlace= createEffect(() => this.actions.pipe(
    ofType(createPlaceRequest),
    mergeMap(({placeData}) => this.placeService.createPlace(placeData).pipe(
      map(() => createPlaceSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackbar('Заведение добавлено!');
      }),
      catchError(() => of(createPlaceFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private placeService: PlacesService,
    private helpers: HelpersService
  ) {}
}
