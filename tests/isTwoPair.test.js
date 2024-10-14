import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

test('isTwoPair returnerar 0 om inte två par', () => {
  let hand = new Hand('♥2', '♦2', '♣3', '♠4', '♠5');
  expect(CompareHands.isTwoPair(hand)).toBe(0);
});

test('isTwoPair returnerar korrekt poäng för två par', () => {
  let hand = new Hand('♥2', '♦2', '♣3', '♠3', '♦4');
  let higherPairValue = CompareHands.rankToPoint('3');
  let lowerPairValue = CompareHands.rankToPoint('2');
  let kickerValue = CompareHands.rankToPoint('4');
  let expectedScore = higherPairValue * 10000 + lowerPairValue * 100 + kickerValue;
  let score = CompareHands.isTwoPair(hand);
  expect(score).toBe(expectedScore);
});

test('Två par med högre par vinner', () => {
  let hand1 = new Hand('♥2', '♦2', '♣3', '♠3', '♦4');
  let hand2 = new Hand('♥4', '♦4', '♣5', '♠5', '♦6');
  let score1 = CompareHands.isTwoPair(hand1);
  let score2 = CompareHands.isTwoPair(hand2);
  expect(score2).toBeGreaterThan(score1);
});

test('Om paren är lika avgör kickern', () => {
  let hand1 = new Hand('♥2', '♦2', '♣3', '♠3', '♦4');
  let hand2 = new Hand('♥2', '♦2', '♣3', '♠3', '♦5');
  let score1 = CompareHands.isTwoPair(hand1);
  let score2 = CompareHands.isTwoPair(hand2);
  expect(score2).toBeGreaterThan(score1);
});
