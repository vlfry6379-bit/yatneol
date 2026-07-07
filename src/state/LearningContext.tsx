import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

type QuizResult = {
  selectedIndex: number;
  isCorrect: boolean;
};

type LearningSnapshot = {
  completedIds: string[];
  bookmarkedIds: string[];
  quizResults: Record<string, QuizResult>;
  completedAtById: Record<string, string>;
};

type LearningContextValue = {
  completedIds: string[];
  bookmarkedIds: string[];
  quizResults: Record<string, QuizResult>;
  completedAtById: Record<string, string>;
  isCompleted: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
  markCompleted: (id: string) => void;
  saveQuizResult: (id: string, result: QuizResult) => void;
  toggleBookmark: (id: string) => void;
};

const LEARNING_STORAGE_KEY = 'yatneol.learning.v1';

const LearningContext = createContext<LearningContextValue | undefined>(undefined);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    Object.values(value as Record<string, unknown>).every((item) => typeof item === 'string')
  );
}

function fallbackCompletedAtById(completedIds: string[]): Record<string, string> {
  const now = Date.now();

  return Object.fromEntries(
    completedIds.map((id, index) => [id, new Date(now - index * 1000).toISOString()])
  );
}

function parseLearningSnapshot(value: string | null): LearningSnapshot | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<LearningSnapshot>;
    const completedIds = isStringArray(parsed.completedIds) ? parsed.completedIds : [];

    return {
      completedIds,
      bookmarkedIds: isStringArray(parsed.bookmarkedIds) ? parsed.bookmarkedIds : [],
      quizResults: parsed.quizResults && typeof parsed.quizResults === 'object' ? parsed.quizResults : {},
      completedAtById: isStringRecord(parsed.completedAtById)
        ? parsed.completedAtById
        : fallbackCompletedAtById(completedIds)
    };
  } catch {
    return null;
  }
}

export function LearningProvider({ children }: PropsWithChildren) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});
  const [completedAtById, setCompletedAtById] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSnapshot() {
      const snapshot = parseLearningSnapshot(await AsyncStorage.getItem(LEARNING_STORAGE_KEY));

      if (!isMounted) {
        return;
      }

      if (snapshot) {
        setCompletedIds(snapshot.completedIds);
        setBookmarkedIds(snapshot.bookmarkedIds);
        setQuizResults(snapshot.quizResults);
        setCompletedAtById(snapshot.completedAtById);
      }

      setHydrated(true);
    }

    loadSnapshot();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const snapshot: LearningSnapshot = {
      completedIds,
      bookmarkedIds,
      quizResults,
      completedAtById
    };

    AsyncStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(snapshot));
  }, [bookmarkedIds, completedAtById, completedIds, hydrated, quizResults]);

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
    setCompletedAtById((current) => (current[id] ? current : { ...current, [id]: new Date().toISOString() }));
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
      completedAtById,
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
      completedAtById,
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