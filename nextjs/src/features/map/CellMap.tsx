import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, Polygon, useJsApiLoader } from '@react-google-maps/api';
import { useGetCellsMutation } from '../../services/cells';
import { Cell, CellPayload, CellQuery } from '../../../../node/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectReservations, toggleReservation } from './cellsSlice';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 43.0786,
  lng: -89.3685
};

function CellMap() {
  const [getCells, { isLoading, isError, data }] = useGetCellsMutation();
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [cellPayload, setCellPayload] = useState<CellPayload | null>(null)
  const dispatch = useAppDispatch();
  const reservations = useAppSelector(selectReservations);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDB50AyDmxKqpmpKaqkYfTdBxxhA1DaaQ'
  })


  const onButtonClick = useCallback(async () => {
    const bounds = map?.getBounds();
    const zoom = map?.getZoom();
    if (bounds && zoom && zoom > 9) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const query: CellQuery = {
        minLat: bounds.getSouthWest().lat(),
        maxLat: bounds.getNorthEast().lat(),
        minLng: bounds.getSouthWest().lng(),
        maxLng: bounds.getNorthEast().lng(),
      };
      const result = await getCells(query);
      if ('data' in result) {
        setCellPayload(result.data);
      } else {
        console.error(result.error);
      }

      console.log('zoom ', zoom);
      console.log('result ', result);
    }
  }, [map])

  
  const onCellClick = useCallback((cell: Cell) => async (event: google.maps.MapMouseEvent) => {
    console.log('', cell)
    dispatch(toggleReservation(cell))
  }, []);

  const onLoad = useCallback(async (googleMap: google.maps.Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    googleMap.fitBounds(bounds);

    setMap(googleMap)
  }, [])
  
  const coords = cellPayload ? Object.keys(cellPayload.cells).reduce((acc, cellId) => {
    const cell = cellPayload.cells[cellId];
    const vertexIndices = cell.vertexIndices;
    const vertices = vertexIndices.map(idx => cellPayload.vertices[idx]);
    acc[cellId] = {
      coords: vertices.map(vertex => ({lat: vertex.lat, lng: vertex.lng})),
      cell
    }
    
    return acc;
  }, {} as {[cellId: string]: {cell: Cell, coords: Array<{lat: number, lng: number}>}}) : {};

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div>
      <button onClick={onButtonClick} disabled={isLoading}>
        Create Post
      </button>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { Object.keys(coords).map(cellId => {
        const fillColor = reservations[cellId] ? '#FF0000' : '#4AABFF' as string;
        return <Polygon 
          onClick={onCellClick(coords[cellId].cell)}
          key={cellId} 
          paths={coords[cellId].coords}
          options={{
            strokeColor: '#000000',
            fillColor: fillColor,
            fillOpacity: 0.18,
            strokeWeight: 1
        }}
        />}
      ) }
      <></>
    </GoogleMap>
    </div>
  ) : <></>
}

export default React.memo(CellMap)
