export const logApiError = (e: google.maps.places.PlacesServiceStatus) => {
  // In actual PJ, this should be logged and sent to servers for logging and analyzing
  // For this PJ, I'm just console.error() on the console
  // But it is easy to scale and expand
  switch (e) {
    case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
      console.error('INVALID REQUEST');
      break;
    case google.maps.places.PlacesServiceStatus.NOT_FOUND:
      console.error('NOT FOUND ERROR');
      break;
    case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
      console.error('QUERY LIMIT REACHED');
      break;
    case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
      console.error('REQUEST DENIED');
      break;
    case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
      console.error('UNKNOWN ERROR');
      break;
  }
};

export const logMapError = (e: Error) => {
  console.error(`ERROR: ${e.name} ${e.message}`);
};
