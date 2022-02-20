import { Restaurant } from '../entities/Restaurant';
import { Photo } from '../entities/Photo';
import { Review } from '../entities/Review';
import { Details } from '../entities/Details';
import { nanoid } from 'nanoid';

export class RestaurantsRepository {
  private placeService: google.maps.places.PlacesService;

  constructor(public map: google.maps.Map | null) {
    this.placeService = new google.maps.places.PlacesService(
      map ? map : new HTMLDivElement(),
    );
  }

  public getRestaurantsWithinRange = async (
    center: google.maps.LatLng,
    type: string,
    radius: number,
  ): Promise<Restaurant[]> => {
    return new Promise((resolve, reject) => {
      this.placeService.nearbySearch(
        { location: center, radius: radius, type: type, openNow: true },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            console.log(result);
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
          console.log(result);
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
          reject(status);
        }
      });
    });
  };

  public querySearch = async (keyword: string): Promise<Restaurant[]> => {
    //TODO: DEBUG
    const center = {
      lat: 35.664839,
      lng: 139.738096,
    };
    return new Promise((resolve, reject) => {
      this.placeService.textSearch(
        { location: center, radius: 1000, query: keyword },
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
            reject(status);
          }
        },
      );
    });
  };
}
