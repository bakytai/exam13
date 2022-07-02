import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaceData } from '../../models/place.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/type';
import { createPlaceRequest } from '../../store/places/places.actions';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.sass']
})
export class PlaceFormComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error: Observable<string | null>;
  loading: Observable<boolean>;
  check = false;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.places.createLoading);
    this.error = store.select(state => state.places.createError);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const placeData: PlaceData = this.form.value;
    console.log(placeData)
    this.store.dispatch(createPlaceRequest({placeData}))
  }
}
