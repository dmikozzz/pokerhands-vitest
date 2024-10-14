import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

test('isHighestCard beräknar korrekt poäng', () => {
  let hand = new Hand('♥A', '♦K', '♣Q', '♠J', '♦9');
  let cardValues = ['A', 'K', 'Q', 'J', '9'].map(rank => CompareHands.rankToPoint(rank));
  let expectedScore = cardValues[0] * 100000000 + cardValues[1] * 1000000 + cardValues[2] * 10000 + cardValues[3] * 100 + cardValues[4];
  let score = CompareHands.isHighestCard(hand);
  expect(score).toBe(expectedScore);
});

test('Hand med högre kort vinner', () => {
  let hand1 = new Hand('♥A', '♦K', '♣Q', '♠J', '♦9');
  let hand2 = new Hand('♥A', '♦K', '♣Q', '♠J', '♦T');
  let score1 = CompareHands.isHighestCard(hand1);
  let score2 = CompareHands.isHighestCard(hand2);
  expect(score2).toBeGreaterThan(score1);
});

test('Hand med lägre högsta kort förlorar', () => {
  let hand1 = new Hand('♥K', '♦Q', '♣J', '♠T', '♦9');
  let hand2 = new Hand('♥A', '♦Q', '♣J', '♠T', '♦9');
  let score1 = CompareHands.isHighestCard(hand1);
  let score2 = CompareHands.isHighestCard(hand2);
  expect(score2).toBeGreaterThan(score1);
});
