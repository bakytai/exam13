import { User } from './user.model';

export class Place {
  constructor(
    public _id: string,
    public user: User,
    public title: string,
    public description: string,
    public photo: string,
    public rate: number,
    public kitchenRate: number,
    public serviceRate: number,
    public interiorRate: number
  ) {}
}

export interface PlaceData {
  [key: string]: any;
  title: string;
  description: string;
  image: File;
  check: boolean
}
