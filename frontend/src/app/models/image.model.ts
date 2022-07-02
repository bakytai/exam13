import { User } from './user.model';
import { Place } from './place.model';

export class Image {
  constructor(
    public _id: string,
    public user: User,
    public place: Place,
    public image: string
  ) {}
}
