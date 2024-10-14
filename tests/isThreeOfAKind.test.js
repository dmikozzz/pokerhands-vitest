import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

test('isThreeOfAKind returnerar 0 om inte triss', () => {
  let hand = new Hand('♥2', '♦2', '♣3', '♠4', '♠5');
  expect(CompareHands.isThreeOfAKind(hand)).toBe(0);
});

test('isThreeOfAKind returnerar korrekt poäng för en triss', () => {
  let hand = new Hand('♥2', '♦2', '♣2', '♠3', '♦4');
  let score = CompareHands.isThreeOfAKind(hand);
  let threeRankValue = CompareHands.rankToPoint('2');
  let kickerValues = [CompareHands.rankToPoint('3'), CompareHands.rankToPoint('4')].sort((a, b) => b - a);
  let expectedScore = threeRankValue * 10000 + kickerValues[0] * 100 + kickerValues[1];
  expect(score).toBe(expectedScore);
});

test('Triss med högre rank vinner', () => {
  let hand1 = new Hand('♥2', '♦2', '♣2', '♠5', '♦6');
  let hand2 = new Hand('♥3', '♦3', '♣3', '♠4', '♦5');
  let score1 = CompareHands.isThreeOfAKind(hand1);
  let score2 = CompareHands.isThreeOfAKind(hand2);
  expect(score2).toBeGreaterThan(score1);
});

test('Om trissen är lika avgör kickers', () => {
  let hand1 = new Hand('♥2', '♦2', '♣2', '♠5', '♦6');
  let hand2 = new Hand('♥2', '♦2', '♣2', '♠7', '♦6');
  let score1 = CompareHands.isThreeOfAKind(hand1);
  let score2 = CompareHands.isThreeOfAKind(hand2);
  expect(score2).toBeGreaterThan(score1);
});
