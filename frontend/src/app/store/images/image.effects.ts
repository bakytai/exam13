import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { fetchImagesFailure, fetchImagesRequest, fetchImagesSuccess } from './image.actions';
import { ImagesService } from '../../services/images.service';
import { HelpersService } from '../../services/helpers.service';
import { AppState } from '../type';

@Injectable()

export class ImagesEffects {
  fetchImages = createEffect(() => this.actions.pipe(
    ofType(fetchImagesRequest),
    mergeMap(({id}) => this.imageService.getImages(id).pipe(
      map(images => fetchImagesSuccess({images})),
      catchError(() => of(fetchImagesFailure({error: 'Something went wrong'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private imageService: ImagesService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}
}
