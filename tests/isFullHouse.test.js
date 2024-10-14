import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

test('isFullHouse returnerar 0 om inte kåk', () => {
  let hand = new Hand('♥2', '♦2', '♣3', '♠4', '♠5');
  expect(CompareHands.isFullHouse(hand)).toBe(0);
});

test('isFullHouse returnerar korrekt poäng för en kåk', () => {
  let hand = new Hand('♥2', '♦2', '♣2', '♠3', '♦3');
  let score = CompareHands.isFullHouse(hand);
  let expectedScore = CompareHands.rankToPoint('2') * 100 + CompareHands.rankToPoint('3');
  expect(score).toBe(expectedScore);
});

test('Kåk med högre triss vinner', () => {
  let hand1 = new Hand('♥2', '♦2', '♣2', '♠3', '♦3');
  let hand2 = new Hand('♥3', '♦3', '♣3', '♠2', '♦2');
  let score1 = CompareHands.isFullHouse(hand1);
  let score2 = CompareHands.isFullHouse(hand2);
  expect(score2).toBeGreaterThan(score1);
});

test('Om trissen är lika avgör paret', () => {
  let hand1 = new Hand('♥2', '♦2', '♣2', '♠3', '♦3');
  let hand2 = new Hand('♥2', '♦2', '♣2', '♠4', '♦4');
  let score1 = CompareHands.isFullHouse(hand1);
  let score2 = CompareHands.isFullHouse(hand2);
  expect(score2).toBeGreaterThan(score1);
});
