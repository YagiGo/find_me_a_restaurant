export const getGoogleMapApiKey = () => {
  return process.env.GOOGLE_MAP_API ? process.env.GOOGLE_MAP_API : '';
};
