export default function calculateRating(rating: number) {
  const integer = Math.floor(rating);
  const half = rating - integer >= 0.5 ? 1 : 0;
  return { integer: integer, half: half };
}
