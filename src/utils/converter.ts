import proj4 from 'proj4';

proj4.defs(
  'EPSG:2100',
  '+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9996 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=-199.87,74.79,246.62,0,0,0,0 +units=m +no_defs +type=crs'
);

export function convertWGS84toEGSA87(lat: number, lon: number): [number, number] {
  return proj4('EPSG:4326', 'EPSG:2100', [lon, lat]);
}

export function convertEGSA87toWGS84(x: number, y: number): [number, number] {
  return proj4('EPSG:2100', 'EPSG:4326', [x, y]);
}
