// Splits a message into pieces, marking which pieces should be highlighted
// Returns an array of { text, isHighlighted, contribution } objects
export function buildHighlightedParts(message, topWords) {
  if (!topWords || topWords.length === 0) {
    return [{ text: message, isHighlighted: false }];
  }
 
  // Build a quick lookup: lowercase word -> contribution
  const wordMap = {};
  topWords.forEach((item) => {
    wordMap[item.word.toLowerCase()] = item.contribution;
  });
 
  // Split the message into words AND the gaps between them (spaces, punctuation)
  // The regex captures groups so split() keeps the separators in the result
  const tokens = message.split(/([a-zA-Z]+)/);
 
  return tokens.map((token) => {
    const lower = token.toLowerCase();
    if (wordMap.hasOwnProperty(lower)) {
      return { text: token, isHighlighted: true, contribution: wordMap[lower] };
    }
    return { text: token, isHighlighted: false };
  });
}
