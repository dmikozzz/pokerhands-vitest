import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

test('isOnePair returnerar 0 om inte ett par', () => {
  let hand = new Hand('♥2', '♦3', '♣4', '♠5', '♠6');
  expect(CompareHands.isOnePair(hand)).toBe(0);
});

test('isOnePair returnerar korrekt poäng för ett par', () => {
  let hand = new Hand('♥2', '♦2', '♣3', '♠4', '♦5');
  let pairValue = CompareHands.rankToPoint('2');
  let kickerValues = [CompareHands.rankToPoint('5'), CompareHands.rankToPoint('4'), CompareHands.rankToPoint('3')].sort((a, b) => b - a);
  let expectedScore = pairValue * 1000000 + kickerValues[0] * 10000 + kickerValues[1] * 100 + kickerValues[2];
  let score = CompareHands.isOnePair(hand);
  expect(score).toBe(expectedScore);
});

test('Par med högre värde vinner', () => {
  let hand1 = new Hand('♥2', '♦2', '♣3', '♠4', '♦5');
  let hand2 = new Hand('♥3', '♦3', '♣2', '♠4', '♦5');
  let score1 = CompareHands.isOnePair(hand1);
  let score2 = CompareHands.isOnePair(hand2);
  expect(score2).toBeGreaterThan(score1);
});

test('Om paren är lika avgör kickers', () => {
  let hand1 = new Hand('♥2', '♦2', '♣3', '♠4', '♦5');
  let hand2 = new Hand('♥2', '♦2', '♣3', '♠5', '♦6');
  let score1 = CompareHands.isOnePair(hand1);
  let score2 = CompareHands.isOnePair(hand2);
  expect(score2).toBeGreaterThan(score1);
});
