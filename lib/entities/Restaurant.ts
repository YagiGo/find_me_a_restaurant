export class Restaurant {
  constructor(
    public placeId?: string,
    public name?: string,
    public lat?: number,
    public lng?: number,
    public openingHours?: google.maps.places.PlaceOpeningHours,
    public rating?: number,
    public priceLevel?: number,
  ) {}
}
