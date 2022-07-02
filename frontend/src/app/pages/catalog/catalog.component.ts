import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/type';
import { Place } from '../../models/place.model';
import { deletePlaceRequest, fetchPlacesRequest } from '../../store/places/places.actions';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass']
})
export class CatalogComponent implements OnInit {
  places: Observable<Place[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.places = store.select(state => state.places.places);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
  }

  deletePlace(idPLace: string) {
    this.store.dispatch(deletePlaceRequest({id: idPLace}))
  }
}
