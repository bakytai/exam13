import { User } from './user.model';
import { Place } from './place.model';

export class Reviews {
  constructor(
    public _id: string,
    public user: User,
    public place: Place,
    public dateTime: string,
    public message: string,
    public kitchenRate: number,
    public serviceRate: number,
    public interiorRate: number
  ){}
}

export interface ReviewsData {
  place: string;
  message: string;
  kitchenRate: number;
  serviceRate: number;
  interiorRate: number;
}
