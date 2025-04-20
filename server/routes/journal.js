const express = require('express');
const router = express.Router();
const { analyzeMood } = require('../services/moodAnalyzer');
const { getQuote } = require('../services/quoteFetcher');
const axios = require('axios');

// Mood to Emoji Mapping
const moodToEmoji = {
  '😁': 'happy',
  '😂': 'laughing',
  '😊': 'smiling',
  '😭': 'crying',
  '😠': 'angry',
  '😥': 'sad',
  '😲': 'astonished',
  '😴': 'sleepy',
  '🤔': 'thinking',
  '🙄': 'annoyed',
  '🥰': 'in love',
  '🥳': 'celebrating',
  '😟': 'worried',
  '😎': 'cool',
  '😇': 'innocent',
  '😈': 'mischievous',
  '😱': 'scared',
  '🤩': 'star-struck',
  '🤢': 'disgusted',
  '🤫': 'shushing',
  '🙏': 'praying/hopeful',
  '🙌': 'celebrating success',
  '🤦‍♀️': 'facepalming',
  '🤷‍♀️': 'shrugging',
  '❤️': 'love/affection',
  '💔': 'heartbroken',
  '🔥': 'enthusiastic/amazing',
  '💯': 'excellent',
  '👍': 'approval',
  '👎': 'disapproval',
  '👏': 'clapping',
  '👋': 'saying goodbye',
  '✨': 'feeling magical/sparkly',
  '💫': 'dizzy',
  '🫠': 'melting',
  '🥶': 'freezing',
  '🤯': 'mind-blown',
  '🤪': 'goofy',
  '🥹': 'touched/grateful',
  '🫶': 'heart hands',
  '🫂': 'hugging',
  '🙊': 'speak-no-evil',
  '🙉': 'hear-no-evil',
  '🙈': 'see-no-evil',
  '💀': 'dying of laughter/shock',
  '🤡': 'foolish',
  '👽': 'feeling alien',
  '🤖': 'feeling robotic',
  '👻': 'spooky',
  '💩': 'expressing something negative/silly',
  '🕊️': 'peaceful',
  '🌈': 'hopeful/joyful'
};

router.post('/', async (req, res) => {
  const { entry } = req.body;

  try {
    const mood = await analyzeMood(entry);
    const quote = await getQuote(mood);

    // Fetch GIF from Giphy based on mood
    const giphyRes = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: mood,
        limit: 1,
      },
    });

    const gifUrl = giphyRes.data.data[0]?.images.original.url || '';

    res.json({
      mood,
      emoji: Object.keys(moodToEmoji).find(key => moodToEmoji[key] === mood) || '😶',
      quote,
      gif: gifUrl || null,
    });
  } catch (error) {
    console.error('Error processing journal entry:', error.message);
    res.status(500).json({ error: 'Something went wrong while processing your journal entry.' });
  }
});

module.exports = router;
