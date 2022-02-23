export default function calculateRating(rating: number) {
  if (rating <= 5) {
    const integer = Math.floor(rating);
    const half = rating - integer >= 0.5 ? 1 : 0;
    return { integer: integer, half: half };
  }
  return { integer: 5, half: 0 };
}
