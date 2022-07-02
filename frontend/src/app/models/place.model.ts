import { User } from './user.model';

export class Place {
  constructor(
    public _id: string,
    public user: User,
    public title: string,
    public description: string,
    public photo: string,
    public rate: number
  ) {}
}

export interface PlaceData {

}
