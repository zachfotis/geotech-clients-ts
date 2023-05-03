import { DragEndEvent } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

interface MapProps {
  position: [number, number];
  setPosition?: (position: [number, number]) => void;
  userZoom?: number;
  setUserZoom?: (zoom: number) => void;
  mapType?: MapType;
  draggable?: boolean;
}

export type MapType = 'satellite' | 'street' | 'topographic';

export enum MapEnum {
  satellite = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  street = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  topographic = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
}

function Map({
  position,
  setPosition = () => {},
  userZoom = 14,
  setUserZoom = () => {},
  mapType = 'satellite',
  draggable = true,
}: MapProps) {
  const onMarkerDragEnd = (e: DragEndEvent) => {
    const marker = e.target;
    const position = marker.getLatLng();

    setPosition([position.lat, position.lng]);
  };

  return (
    <MapContainer center={position} zoom={userZoom} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={MapEnum[mapType]}
      />
      <Marker
        position={position}
        draggable={draggable}
        eventHandlers={{
          dragend: onMarkerDragEnd,
        }}
      />
      <MyCustomComponent setUserZoom={setUserZoom} />
    </MapContainer>
  );
}

export default Map;

function MyCustomComponent({ setUserZoom }: { setUserZoom: (zoom: number) => void }) {
  const mapEvent = useMapEvents({});

  mapEvent.addEventListener('zoomend', (e) => {
    setUserZoom(mapEvent.getZoom());
  });
  return null;
}
