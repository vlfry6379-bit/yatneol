export type KnowledgeCategory =
  | '경제'
  | '역사'
  | '과학'
  | '심리'
  | 'AI/기술'
  | '생활지식'
  | '사회';

export type KnowledgeCard = {
  title: string;
  body: string;
};

export type KnowledgeQuiz = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type KnowledgeItem = {
  id: string;
  title: string;
  category: KnowledgeCategory;
  summary: string;
  difficulty: string;
  estimatedMinutes: number;
  cards: KnowledgeCard[];
  quiz: KnowledgeQuiz;
};
