import React, { FC, useCallback, useContext, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { RestaurantsRepository } from '../../repositories/RestaurantsRepository';
import { MapContext } from '../../context/MapContext';
const MapView: FC = () => {
  // TODO: DEBUG
  const center = {
    lat: 35.664839,
    lng: 139.738096,
  };
  const { restaurants, map, setMap, setPlaceServices } = useContext(MapContext);

  useEffect(() => {
    if (map) {
      setPlaceServices(new RestaurantsRepository(map));
    }
  }, [map, setPlaceServices]);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
    },
    [setMap],
  );

  const onMapUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  const markers = restaurants.map((i) => {
    if (i.lat && i.lng) {
      return <Marker key={i.placeId} position={{ lat: i.lat, lng: i.lng }} />;
    }
  });

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: 'inherit' }}
      center={center}
      zoom={15}
      onLoad={onMapLoad}
      onUnmount={onMapUnmount}
    >
      {markers}
    </GoogleMap>
  );
};

export default MapView;
