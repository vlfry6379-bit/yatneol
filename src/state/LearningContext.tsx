import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

type QuizResult = {
  selectedIndex: number;
  isCorrect: boolean;
};

type LearningContextValue = {
  completedIds: string[];
  bookmarkedIds: string[];
  quizResults: Record<string, QuizResult>;
  isCompleted: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
  markCompleted: (id: string) => void;
  saveQuizResult: (id: string, result: QuizResult) => void;
  toggleBookmark: (id: string) => void;
};

const LearningContext = createContext<LearningContextValue | undefined>(undefined);

export function LearningProvider({ children }: PropsWithChildren) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});

  const isCompleted = useCallback(
    (id: string) => completedIds.includes(id),
    [completedIds]
  );

  const isBookmarked = useCallback(
    (id: string) => bookmarkedIds.includes(id),
    [bookmarkedIds]
  );

  const markCompleted = useCallback((id: string) => {
    setCompletedIds((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const saveQuizResult = useCallback((id: string, result: QuizResult) => {
    setQuizResults((current) => ({
      ...current,
      [id]: result
    }));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  }, []);

  const value = useMemo(
    () => ({
      completedIds,
      bookmarkedIds,
      quizResults,
      isCompleted,
      isBookmarked,
      markCompleted,
      saveQuizResult,
      toggleBookmark
    }),
    [
      completedIds,
      bookmarkedIds,
      quizResults,
      isCompleted,
      isBookmarked,
      markCompleted,
      saveQuizResult,
      toggleBookmark
    ]
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const value = useContext(LearningContext);

  if (!value) {
    throw new Error('useLearning must be used inside LearningProvider');
  }

  return value;
}
