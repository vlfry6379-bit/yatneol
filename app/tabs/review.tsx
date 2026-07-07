import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../src/components/AppHeader';
import { KnowledgeListCard } from '../../src/components/KnowledgeListCard';
import { colors } from '../../src/constants/colors';
import { knowledgeItems } from '../../src/data/knowledgeData';
import { useLearning } from '../../src/state/LearningContext';
import type { KnowledgeItem } from '../../src/types/knowledge';

type ReviewItem = {
  item: KnowledgeItem;
  completedAt: string;
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '최근 학습';
  }

  return `${date.getMonth() + 1}월 ${date.getDate()}일 학습`;
}

export default function ReviewScreen() {
  const { completedAtById, completedIds, isCompleted } = useLearning();

  const reviewItems = useMemo<ReviewItem[]>(() => {
    return completedIds
      .map((id) => {
        const item = knowledgeItems.find((knowledgeItem) => knowledgeItem.id === id);

        if (!item) {
          return null;
        }

        return {
          item,
          completedAt: completedAtById[id] || ''
        };
      })
      .filter((reviewItem): reviewItem is ReviewItem => Boolean(reviewItem))
      .sort((a, b) => {
        const aTime = new Date(a.completedAt).getTime() || 0;
        const bTime = new Date(b.completedAt).getTime() || 0;

        return bTime - aTime;
      });
  }, [completedAtById, completedIds]);

  const recentItems = reviewItems.slice(0, 3);
  const revisitItems = reviewItems.slice(3);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader title="복습" subtitle="내가 완료한 지식을 다시 꺼내볼 수 있어요." />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>실제 학습 이력 기반</Text>
        <Text style={styles.infoText}>
          퀴즈를 완료한 지식이 이곳에 쌓입니다. 아직은 날짜별 복습 알고리즘 대신 최근 완료 순서로 보여줘요.
        </Text>
      </View>

      {reviewItems.length === 0 ? (
        <Text style={styles.emptyText}>아직 복습할 지식이 없어요. 홈에서 지식 하나를 완료해보세요.</Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>최근 완료한 지식</Text>
          {recentItems.map(({ item, completedAt }) => (
            <View key={item.id} style={styles.reviewCardWrap}>
              <Text style={styles.reviewMeta}>{formatDate(completedAt)}</Text>
              <KnowledgeListCard item={item} completed={isCompleted(item.id)} />
            </View>
          ))}

          {revisitItems.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>다시 볼 지식</Text>
              {revisitItems.map(({ item, completedAt }) => (
                <View key={item.id} style={styles.reviewCardWrap}>
                  <Text style={styles.reviewMeta}>{formatDate(completedAt)}</Text>
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
    padding: 18
  }
});