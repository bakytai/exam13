import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})

export class ImagesService {
  constructor(private http: HttpClient) {}

  getImages(id: string) {
    return this.http.get<Image[]>(environment.apiUrl + `/images?place=${id}`).pipe(
      map(response => {
        return response.map(data => {
          return new Image(data._id, data.user, data.place, data.image);
        });
      })
    );
  }

}
