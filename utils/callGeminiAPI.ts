import { handleFAQQuery } from '@/lib/handleFAQQuery';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function callGeminiAPI(input: string, language: string = 'en'): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const faqMatch = handleFAQQuery(userInput);
if (faqMatch) {
  return {
    type: "faq",
    data: {
      matchedQuestion: faqMatch.question,
      answer: faqMatch.answer,
      category: faqMatch.category,
    }
  };
}

    const promptIntro = faqMatch
      ? `The user asked a question related to company information. Here's what we know:\n\n"${faqMatch.response}"\n\nUse this info to answer naturally:\n\n`
      : '';

    const prompt = `${promptIntro}${input}`;

    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return 'Sorry, there was an error generating the response.';
  }
}
