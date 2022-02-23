import { Restaurant } from '../entities/Restaurant';
import { Photo } from '../entities/Photo';
import { Review } from '../entities/Review';
import { Details } from '../entities/Details';
import { nanoid } from 'nanoid';
import { logApiError } from '../infrastructure/logger';

export class RestaurantsRepository {
  private placeService: google.maps.places.PlacesService;
  private readonly center;
  constructor(public map: google.maps.Map | null) {
    this.placeService = new google.maps.places.PlacesService(
      map ? map : new HTMLDivElement(),
    );
    this.center = {
      lat: process.env.CENTER_LAT ? Number(process.env.CENTER_LAT) : 0,
      lng: process.env.CENTER_LNG ? Number(process.env.CENTER_LNG) : 0,
    };
  }

  public getRestaurantsWithinRange = async (
    type: string,
    radius: number,
  ): Promise<Restaurant[]> => {
    return new Promise((resolve, reject) => {
      this.placeService.nearbySearch(
        { location: this.center, radius: radius, type: type, openNow: true },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            resolve(
              result.map(
                (i) =>
                  new Restaurant(
                    i.place_id,
                    i.name,
                    i.geometry?.location?.lat(),
                    i.geometry?.location?.lng(),
                    undefined,
                    i.rating,
                    i.price_level,
                  ),
              ),
            );
          } else {
            logApiError(status);
            reject(status);
          }
        },
      );
    });
  };

  public getRestaurantDetails = async (placeId: string): Promise<Details> => {
    return new Promise((resolve, reject) => {
      this.placeService.getDetails({ placeId: placeId }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          const photos = result.photos?.map(
            (photo) =>
              new Photo(nanoid(), photo.getUrl(), photo.width, photo.height),
          );
          const reviews = result.reviews?.map(
            (review) =>
              new Review(
                nanoid(),
                review.profile_photo_url,
                review.text,
                review.rating ? review.rating : 0,
              ),
          );
          const basicInfo = new Restaurant(
            result.place_id,
            result.name,
            result.geometry?.location?.lat(),
            result.geometry?.location?.lng(),
            result.opening_hours,
            result.rating,
            result.price_level,
          );
          resolve(
            new Details(
              basicInfo,
              result.formatted_address ? result.formatted_address : '',
              result.formatted_phone_number
                ? result.formatted_phone_number
                : '',
              result.website ? result.website : '',
              photos ? photos : [],
              reviews ? reviews : [],
            ),
          );
        } else {
          logApiError(status);
          reject(status);
        }
      });
    });
  };

  public querySearch = async (keyword: string): Promise<Restaurant[]> => {
    return new Promise((resolve, reject) => {
      this.placeService.textSearch(
        { location: this.center, radius: 1000, query: keyword },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (!result) resolve([]);
            else {
              resolve(
                result.map(
                  (i) =>
                    new Restaurant(
                      i.place_id,
                      i.name,
                      i.geometry?.location?.lat(),
                      i.geometry?.location?.lng(),
                      undefined,
                      i.rating,
                      i.price_level,
                    ),
                ),
              );
            }
          } else {
            logApiError(status);
            reject(status);
          }
        },
      );
    });
  };
}
