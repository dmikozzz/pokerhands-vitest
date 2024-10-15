import { expect, test } from 'vitest';
import Hand from '../Hand.js';
import CompareHands from '../CompareHands.js';

test('Compare Four of a Kind vs Two Pair', () => {
  // Four of a Kind hand
  const hand1 = new Hand('♠9', '♥9', '♦9', '♣9', '♠K'); 
  // Two Pair hand
  const hand2 = new Hand('♠Q', '♥Q', '♦J', '♣J', '♠2'); 
  const winner = CompareHands.comparer(hand1, hand2);

  expect(winner).toBe(hand1);
});

test('Compare Full House vs Two Pair', () => {
  // Full House hand
  const hand1 = new Hand('♠K', '♥K', '♦K', '♣Q', '♥Q'); 
  // Two Pair hand
  const hand2 = new Hand('♠A', '♥A', '♦J', '♣J', '♠9'); 
  const winner = CompareHands.comparer(hand1, hand2);

  expect(winner).toBe(hand1);
});

test('Compare Two Pair vs One Pair', () => {
  // Two Pair hand
  const hand1 = new Hand('♠5', '♥5', '♦8', '♣8', '♠Q'); 
  // One Pair hand
  const hand2 = new Hand('♠K', '♥K', '♦J', '♣9', '♠2'); 
  const winner = CompareHands.comparer(hand1, hand2);

  expect(winner).toBe(hand1);
});

test('Compare Full House vs Full House', () => {
  // Full House hand with higher three of a kind
  const hand1 = new Hand('♠A', '♥A', '♦A', '♣K', '♥K'); 
  // Full House hand with lower three of a kind
  const hand2 = new Hand('♠K', '♥K', '♦K', '♣Q', '♥Q'); 
  const winner = CompareHands.comparer(hand1, hand2);

  expect(winner).toBe(hand1);
});

test('Compare Full House vs Full House with same three of a kind', () => {
  // Full House hand with same three of a kind but higher pair
  const hand1 = new Hand('♠K', '♥K', '♦K', '♣A', '♥A'); 
  const hand2 = new Hand('♠K', '♥K', '♦K', '♣Q', '♥Q'); 

  const winner = CompareHands.comparer(hand1, hand2);

  expect(winner).toBe(hand1);
});

test('Compare Hands with Tie', () => {
  const hand1 = new Hand('♠A', '♥A', '♦A', '♣K', '♥K'); 
  const hand2 = new Hand('♠A', '♥A', '♦A', '♣K', '♥K'); 
  const winner = CompareHands.comparer(hand1, hand2);

  expect(winner).toEqual([hand1, hand2]);
});
