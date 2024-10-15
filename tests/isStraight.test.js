import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

const suits = '♥♦♣♠';

test('check that isStraight returns truthy if straight', () => {
  let hand = new Hand('♥9', '♦8', '♣7', '♥5', '♦6');
  expect(CompareHands.isStraight(hand)).toBeTruthy();
});

test('compare two straights, higher one wins', () => {
  let hand1 = new Hand('♥9', '♦8', '♣7', '♠6', '♦5');
  let hand2 = new Hand('♥A', '♦K', '♣Q', '♠J', '♦T');
  expect(CompareHands.isStraight(hand2)).toBeGreaterThan(CompareHands.isStraight(hand1));
});
