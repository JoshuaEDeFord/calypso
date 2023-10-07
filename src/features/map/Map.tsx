import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useGetCellsMutation } from '../../services/cells';
import { CellQuery } from '../../../node/types';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const [getCells, { isLoading, isError, data }] = useGetCellsMutation();
  const handleSubmit = async () => {
    const postData: CellQuery = {'minLat': 89,'maxLat': 90,'minLng': 36,'maxLng': 37};
    const result = await getCells(postData);
    // handle result if needed
  };


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDB50AyDmxKqpmpKaqkYfTdBxxhA1DaaQ'
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div>
      <button onClick={handleSubmit} disabled={isLoading}>
        Create Post
      </button>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
    </div>
  ) : <></>
}

export default React.memo(Map)
