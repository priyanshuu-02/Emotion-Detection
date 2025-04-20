const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeMood = async (entry) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
      Provide an inspiring, comforting, or thought-provoking quote for someone who is currently 
      feeling (such as happy, sad, angry, or neutral)"${entry}". 
      The quote should align with their emotional state, 
      offering positivity, support, or motivation based on their mood.
      Respond with only the mood as one word.
    `;

    //Provide an inspiring, comforting, or thought-provoking quote for someone who is currently 
    // feeling "${entry}". The quote should align with their emotional state, 
    // offering positivity, support, or motivation based on their mood.

    const result = await model.generateContent(prompt);
    const mood = (await result?.response?.text())?.trim().toLowerCase();

    console.log('Mood analysis result:', mood);

    return mood || 'neutral';
  } catch (error) {
    console.error('Error analyzing mood:', error);
    return 'neutral'; // Fallback for robustness
  }
};

module.exports = { analyzeMood };
