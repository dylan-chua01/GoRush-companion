import { COMPANY_KNOWLEDGE } from "@/data/knowledge";

type MatchedFAQ = {
  response: any;
  question: string;
  answer: string;
  category: string;
};

export function handleFAQQuery(userInput: string): MatchedFAQ | null {
  const input = userInput.toLowerCase();

  for (const [category, faqs] of Object.entries(COMPANY_KNOWLEDGE.faqs)) {
    for (const entry of faqs) {
      const q = entry.question.toLowerCase();
      const q_ms = entry.question_ms?.toLowerCase();

      if (input.includes(q) || (q_ms && input.includes(q_ms))) {
        return {
          question: entry.question,
          answer: entry.answer,
          category,
        };
      }
    }
  }

  return null;
}
