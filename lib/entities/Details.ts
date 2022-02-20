import { Photo } from './Photo';
import { Restaurant } from './Restaurant';
import { Review } from './Review';

export class Details {
  constructor(
    public basicInfo: Restaurant,
    public address: string,
    public phone: string,
    public homepage: string,
    public photos: Photo[],
    public reviews: Review[],
  ) {}
}
