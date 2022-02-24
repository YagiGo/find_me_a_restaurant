import React, { FC, useCallback, useContext, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { RestaurantsRepository } from '../../repositories/RestaurantsRepository';
import { MapContext } from '../../context/MapContext';
import { getOfficeGeoInfo } from '../../infrastructure/getOfficeGeoInfo';
import MarkerInfo from './MarkerInfo';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
const MapView: FC = () => {
  const { restaurants, map, setMap, setPlaceServices } = useContext(MapContext);

  useEffect(() => {
    if (map) {
      setPlaceServices(new RestaurantsRepository(map));
    }
  }, [map]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const markers = restaurants.map((i) => {
    if (i.lat && i.lng) {
      return (
        <InfoWindow key={i.placeId} position={{ lat: i.lat, lng: i.lng }}>
          <MarkerInfo name={i.name ? i.name : 'Name Unknown'} />
        </InfoWindow>
      );
    }
  });

  const getCenter = () => {
    // If there is only 1 restaurant to be shown, we've chosen the detail page
    // so center on the chosen restaurant. Otherwise, center on the office building
    return restaurants.length === 1
      ? {
          lat: restaurants[0].lat ? restaurants[0].lat : 0,
          lng: restaurants[0].lng ? restaurants[0].lng : 0,
        }
      : getOfficeGeoInfo();
  };
  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: 'inherit' }}
      center={getCenter()}
      zoom={15}
      onLoad={onMapLoad}
      onUnmount={onMapUnmount}
    >
      <Marker
        position={getOfficeGeoInfo()}
        icon={{
          path: faBuilding.icon[4] as string,
          fillColor: '#000000',
          fillOpacity: 1,
          anchor: new google.maps.Point(
            faBuilding.icon[0] / 2,
            faBuilding.icon[1],
          ),
          strokeWeight: 1,
          strokeColor: '#ffffff',
          scale: 0.075,
        }}
      />
      {markers}
    </GoogleMap>
  );
};

export default MapView;
