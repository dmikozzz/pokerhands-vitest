export default class CompareHands {

  static suits = '♥♦♣♠';
  static ranks = '23456789TJQKA';

  // return the winning hand
  static comparer(hand1, hand2) {

    let comparers = [
      'isStraightFlush',
      'isFourOfAKind',
      'isFullHouse',
      'isFlush',
      'isStraight',
      'isThreeOfAKind',
      'isTwoPair',
      'isOnePair',
      'isHighestCard'
    ];

    for (let comparer of comparers) {
      let hand1Score = this[comparer](hand1);
      let hand2Score = this[comparer](hand2);
      console.log(comparer, 'hand1Score', hand1Score, 'hand2Score', hand2Score);
      // nobody has this kind combination - continue to next comparer
      if (hand1Score === 0 && hand2Score === 0) { continue; }
      // at least has one hand has this kind of combination
      // which hand won?
      if (hand1Score === hand2Score) { return [hand1, hand2]; }
      else if (hand1Score > hand2Score) { return hand1; }
      else { return hand2; }
    }

  }

  static isStraightFlush(hand) {
    // if not straight or not flush -> 0
    // otherwise score of flush
    return this.isStraight(hand) && this.isFlush(hand);
  }

  static isFlush(hand) {
    let suits = [];
    for (let card of hand.cards) {
      suits.push(card.suit);
    }
    // not a flush -> 0
    if ([...new Set(suits)].length !== 1) {
      return 0;
    }
    // return points depending of strength of flush
    this.sortByRank(hand);
    let score = 0, counter = 0;
    for (let card of hand.cards) {
      score += this.rankToPoint(card.rank) * 10 ** counter;
      counter += 2;
    }
    return score;
  }
  
  static isFourOfAKind(hand) {
    // Create counter for each rank
    let rankCounts = {};
    for (let card of hand.cards) {
      let rank = card.rank;
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }
  
    let ranks = Object.keys(rankCounts);
    let counts = Object.values(rankCounts);
  
    // Checks if there is four of a kind
    if (counts.includes(4)) {
      let fourRank = ranks.find(rank => rankCounts[rank] === 4);
      let kickerRank = ranks.find(rank => rankCounts[rank] === 1);

      // Counts points based on four of a kind
      let fourRankValue = this.rankToPoint(fourRank);
      let kickerValue = this.rankToPoint(kickerRank);
  
      let score = fourRankValue * 100 + kickerValue;
      return score;
    } else {
      return 0;
    }
  }
  

  static isFullHouse(hand) {
    // Counts total value of each rank
    let rankCounts = {};
    for (let card of hand.cards) {
      let rank = card.rank;
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }
  
    let counts = Object.values(rankCounts).sort((a, b) => b - a);
  
    // Controls hand is a full house
    if (counts[0] === 3 && counts[1] === 2) {
      // get rank for three of a kind and pair
      let threeRank = Object.keys(rankCounts).find(rank => rankCounts[rank] === 3);
      let pairRank = Object.keys(rankCounts).find(rank => rankCounts[rank] === 2);
  
      // Counts points
      let threeRankValue = this.rankToPoint(threeRank);
      let pairRankValue = this.rankToPoint(pairRank);
      let score = threeRankValue * 100 + pairRankValue;
  
      return score;
    } else {
      return 0;
    }
  }
  

  static isStraight(hand) {
    // sort from low to high
    this.sortByRank(hand);
    // get the ranks of the cards
    let ranks = '';
    for (let card of hand.cards) {
      ranks += card.rank;
    }
    // if both 2 and A then place A first
    if (ranks.includes('2') && ranks.includes('A')) {
      ranks = 'A' + ranks.slice(0, 4);
    }
    // not a straight -> 0
    if (!('A' + this.ranks).includes(ranks)) { return 0; };
    // return points depending on strength of straight
    return this.rankToPoint(ranks[4]);
  }

  static isThreeOfAKind(hand) {
    // Counts total value of each rank
    let rankCounts = {};
    for (let card of hand.cards) {
      let rank = card.rank;
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }
  
    let counts = Object.values(rankCounts).sort((a, b) => b - a);
  
    // Controls that hand is three of a kind
    if (counts[0] === 3 && counts[1] === 1 && counts[2] === 1) {
      // Get rank for three of a kind
      let threeRank = Object.keys(rankCounts).find(rank => rankCounts[rank] === 3);
      // Get kickers
      let kickerRanks = Object.keys(rankCounts).filter(rank => rankCounts[rank] === 1);
  
      // Counts points
      let threeRankValue = this.rankToPoint(threeRank);
      let kickerValues = kickerRanks.map(rank => this.rankToPoint(rank)).sort((a, b) => b - a);
  
      let score = threeRankValue * 10000 + kickerValues[0] * 100 + kickerValues[1];
      return score;
    } else {
      return 0;
    }
  }
  

  static isTwoPair(hand) {
    // Counts total value of each rank
    let rankCounts = {};
    for (let card of hand.cards) {
      let rank = card.rank;
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }
  
    let counts = Object.values(rankCounts).sort((a, b) => b - a);
  
    // Checks if hand is 2 pairs
    if (counts[0] === 2 && counts[1] === 2 && counts[2] === 1) {
      // Get pair ranks
      let pairRanks = Object.keys(rankCounts).filter(rank => rankCounts[rank] === 2).sort((a, b) => this.rankToPoint(b) - this.rankToPoint(a));
      let kickerRank = Object.keys(rankCounts).find(rank => rankCounts[rank] === 1);
  
      // Counts points
      let higherPairValue = this.rankToPoint(pairRanks[0]);
      let lowerPairValue = this.rankToPoint(pairRanks[1]);
      let kickerValue = this.rankToPoint(kickerRank);
  
      let score = higherPairValue * 10000 + lowerPairValue * 100 + kickerValue;
      return score;
    } else {
      return 0;
    }
  }
  

  static isOnePair(hand) {
    // Counts the value of each rank
    let rankCounts = {};
    for (let card of hand.cards) {
      let rank = card.rank;
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }
  
    let counts = Object.values(rankCounts).sort((a, b) => b - a);
  
    // Checks if the hand is a pair
    if (counts[0] === 2 && counts[1] === 1 && counts[2] === 1 && counts[3] === 1) {
      // Pairs value:
      let pairRank = Object.keys(rankCounts).find(rank => rankCounts[rank] === 2);
      // get kickers
      let kickerRanks = Object.keys(rankCounts).filter(rank => rankCounts[rank] === 1);
  
      //counts points
      let pairValue = this.rankToPoint(pairRank);
      let kickerValues = kickerRanks.map(rank => this.rankToPoint(rank)).sort((a, b) => b - a);
  
      let score = pairValue * 1000000 + kickerValues[0] * 10000 + kickerValues[1] * 100 + kickerValues[2];
      return score;
    } else {
      return 0;
    }
  }
  

  static isHighestCard(hand) {
    // Sort hand, highest to lowest
    hand.cards.sort((a, b) => this.rankToPoint(b.rank) - this.rankToPoint(a.rank));
  
    // Figuring out the value of each card
    let score = 0;
    let multiplier = 100000000; // Starts with the highest value
  
    for (let card of hand.cards) {
      let cardValue = this.rankToPoint(card.rank);
      score += cardValue * multiplier;
      multiplier /= 100; // Lowers after each card
    }
  
    return score;
  }

  static rankToPoint(rank) {
    return this.ranks.indexOf(rank) + 2;
  }

  static sortByRank(hand) {
    hand.cards = hand.cards.sort((a, b) => {
      return this.rankToPoint(a.rank) < this.rankToPoint(b.rank) ?
        -1 : 1;
    });
  }


}