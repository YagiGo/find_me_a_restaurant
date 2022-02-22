export const getOfficeGeoInfo = () => ({
  lat: process.env.CENTER_LAT ? Number(process.env.CENTER_LAT) : 0,
  lng: process.env.CENTER_LNG ? Number(process.env.CENTER_LNG) : 0,
});
