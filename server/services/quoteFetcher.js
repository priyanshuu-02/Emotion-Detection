const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getQuote(mood) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
      Provide a short, original, and inspiring quote that would help someone who is feeling "${mood}".
      Keep it under 25 words. No author needed, just the quote.
    `;

    const result = await model.generateContent(prompt);
    const quote = (await result.response?.text())?.trim();

    if (!quote) {
      throw new Error('No quote returned from Gemini');
    }

    return quote;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return 'Stay strong. Better days are ahead.'; // Fallback quote
  }
}

module.exports = { getQuote };
