import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

test('Kontrollerar att isFourOfAKind returnerar 0 om inte fyrtal', () => {
  let hand = new Hand('♥7', '♦7', '♣7', '♠3', '♠2');
  expect(CompareHands.isFourOfAKind(hand)).toBe(0);
});

test('Kontrollerar att isFourOfAKind returnerar korrekt poäng för fyrtal', () => {
  let hand = new Hand('♥7', '♦7', '♣7', '♠7', '♠3');
  let score = CompareHands.isFourOfAKind(hand);
  let expectedScore = CompareHands.rankToPoint('7') * 100 + CompareHands.rankToPoint('3');
  expect(score).toBe(expectedScore);
});

test('Kontrollerar att högre fyrtal ger högre poäng', () => {
  let hand1 = new Hand('♥7', '♦7', '♣7', '♠7', '♠3');
  let hand2 = new Hand('♥9', '♦9', '♣9', '♠9', '♠2');
  let score1 = CompareHands.isFourOfAKind(hand1);
  let score2 = CompareHands.isFourOfAKind(hand2);
  expect(score2).toBeGreaterThan(score1);
});

test('Kontrollerar att högre kicker avgör vid lika fyrtal', () => {
  let hand1 = new Hand('♥7', '♦7', '♣7', '♠7', '♠2');
  let hand2 = new Hand('♥7', '♦7', '♣7', '♠7', '♠3');
  let score1 = CompareHands.isFourOfAKind(hand1);
  let score2 = CompareHands.isFourOfAKind(hand2);
  expect(score2).toBeGreaterThan(score1);
});
