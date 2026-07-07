import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../src/components/AppHeader';
import { KnowledgeListCard } from '../../src/components/KnowledgeListCard';
import { colors } from '../../src/constants/colors';
import { knowledgeItems } from '../../src/data/knowledgeData';
import { useLearning } from '../../src/state/LearningContext';
import type { KnowledgeItem } from '../../src/types/knowledge';

type ReviewStage = {
  day: number;
  label: string;
};

type ReviewItem = {
  item: KnowledgeItem;
  completedAt: string;
  nextReviewAt: Date;
  stageLabel: string;
  isDue: boolean;
};

const REVIEW_STAGES: ReviewStage[] = [
  { day: 1, label: '1차 복습' },
  { day: 3, label: '2차 복습' },
  { day: 7, label: '장기 복습' }
];
const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatReviewDate(date: Date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function buildReviewPlan(item: KnowledgeItem, completedAt: string, today: Date): ReviewItem | null {
  const completedDate = new Date(completedAt);

  if (Number.isNaN(completedDate.getTime())) {
    return null;
  }

  const completedDay = startOfDay(completedDate);
  const todayDay = startOfDay(today);
  const elapsedDays = Math.max(0, Math.floor((todayDay.getTime() - completedDay.getTime()) / DAY_MS));
  const nextStage = REVIEW_STAGES.find((stage) => elapsedDays < stage.day) || REVIEW_STAGES[REVIEW_STAGES.length - 1];
  const dueStage = [...REVIEW_STAGES].reverse().find((stage) => elapsedDays >= stage.day);
  const stage = dueStage || nextStage;
  const nextReviewAt = new Date(completedDay.getTime() + stage.day * DAY_MS);

  return {
    item,
    completedAt,
    nextReviewAt,
    stageLabel: stage.label,
    isDue: todayDay.getTime() >= nextReviewAt.getTime()
  };
}

export default function ReviewScreen() {
  const { completedAtById, completedIds, isCompleted } = useLearning();

  const reviewItems = useMemo<ReviewItem[]>(() => {
    const today = new Date();

    return completedIds
      .map((id) => {
        const item = knowledgeItems.find((knowledgeItem) => knowledgeItem.id === id);

        if (!item) {
          return null;
        }

        return buildReviewPlan(item, completedAtById[id] || '', today);
      })
      .filter((reviewItem): reviewItem is ReviewItem => Boolean(reviewItem))
      .sort((a, b) => a.nextReviewAt.getTime() - b.nextReviewAt.getTime());
  }, [completedAtById, completedIds]);

  const dueItems = reviewItems.filter((reviewItem) => reviewItem.isDue);
  const upcomingItems = reviewItems.filter((reviewItem) => !reviewItem.isDue);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader title="복습" subtitle="잊기 전에 다시 보면 더 오래 기억할 수 있어요." />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>1일, 3일, 7일 복습 리듬</Text>
        <Text style={styles.infoText}>
          퀴즈를 완료한 지식은 완료일을 기준으로 1일 뒤, 3일 뒤, 7일 뒤에 다시 볼 수 있게 정리돼요.
        </Text>
      </View>

      {reviewItems.length === 0 ? (
        <Text style={styles.emptyText}>아직 복습할 지식이 없어요. 홈에서 지식 하나를 완료해보세요.</Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>오늘 복습할 지식</Text>
          {dueItems.length > 0 ? (
            dueItems.map(({ item, nextReviewAt, stageLabel }) => (
              <View key={item.id} style={styles.reviewCardWrap}>
                <Text style={styles.reviewMeta}>{stageLabel} · {formatReviewDate(nextReviewAt)} 예정</Text>
                <KnowledgeListCard item={item} completed={isCompleted(item.id)} />
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>오늘은 예정된 복습이 없어요.</Text>
          )}

          {upcomingItems.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>앞으로 복습할 지식</Text>
              {upcomingItems.map(({ item, nextReviewAt, stageLabel }) => (
                <View key={item.id} style={styles.reviewCardWrap}>
                  <Text style={styles.reviewMeta}>{stageLabel} · {formatReviewDate(nextReviewAt)} 예정</Text>
                  <KnowledgeListCard item={item} completed={isCompleted(item.id)} />
                </View>
              ))}
            </>
          ) : null}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
    padding: 20,
    paddingTop: 58
  },
  infoBox: {
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    marginBottom: 22,
    padding: 16
  },
  infoTitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6
  },
  infoText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 4
  },
  reviewCardWrap: {
    marginBottom: 4
  },
  reviewMeta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
    marginLeft: 4
  },
  emptyText: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
    padding: 18
  }
});