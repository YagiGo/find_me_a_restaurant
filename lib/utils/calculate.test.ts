import calculateRating from './calculate';
import { expect } from '@jest/globals';

test('test the rating-start conversion function', () => {
  expect(calculateRating(0.3)).toStrictEqual({ integer: 0, half: 0 });
  expect(calculateRating(0.6)).toStrictEqual({ integer: 0, half: 1 });
  expect(calculateRating(0.6)).toStrictEqual({ integer: 0, half: 1 });
  expect(calculateRating(4.3)).toStrictEqual({ integer: 4, half: 0 });
  expect(calculateRating(4.5)).toStrictEqual({ integer: 4, half: 1 });
  expect(calculateRating(4.6)).toStrictEqual({ integer: 4, half: 1 });
  expect(calculateRating(5)).toStrictEqual({ integer: 5, half: 0 });
  expect(calculateRating(5.6)).toStrictEqual({ integer: 5, half: 0 });
  expect(calculateRating(10)).toStrictEqual({ integer: 5, half: 0 });
});
