import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CategoryChip } from '../../src/components/CategoryChip';
import { ProgressBar } from '../../src/components/ProgressBar';
import { colors } from '../../src/constants/colors';
import { findKnowledgeById } from '../../src/data/knowledgeData';
import { useLearning } from '../../src/state/LearningContext';

export default function KnowledgeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useMemo(() => (id ? findKnowledgeById(id) : undefined), [id]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isBookmarked, toggleBookmark } = useLearning();

  if (!item) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>지식을 찾을 수 없어요</Text>
        <Text style={styles.emptyText}>존재하지 않는 콘텐츠이거나 아직 준비 중인 지식입니다.</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.replace('/tabs/home')}>
          <Text style={styles.primaryButtonText}>홈으로 돌아가기</Text>
        </Pressable>
      </View>
    );
  }

  const currentCard = item.cards[currentIndex];
  const bookmarked = isBookmarked(item.id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === item.cards.length - 1;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <CategoryChip label={item.category} />
          <Pressable style={styles.bookmarkButton} onPress={() => toggleBookmark(item.id)}>
            <Text style={styles.bookmarkText}>{bookmarked ? '북마크됨' : '북마크'}</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
      </View>

      <View style={styles.whyBox}>
        <Text style={styles.whyLabel}>왜 알아야 할까?</Text>
        <Text style={styles.whyText}>{item.whyItMatters}</Text>
      </View>

      <View style={styles.progressWrap}>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {item.cards.length}
        </Text>
        <ProgressBar current={currentIndex + 1} total={item.cards.length} />
      </View>

      <View style={styles.cardBox}>
        <Text style={styles.cardStep}>카드 {currentIndex + 1}</Text>
        <Text style={styles.cardTitle}>{currentCard.title}</Text>
        <Text style={styles.cardBody}>{currentCard.body}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          disabled={isFirst}
          style={[styles.secondaryButton, isFirst && styles.disabledButton]}
          onPress={() => setCurrentIndex((value) => Math.max(value - 1, 0))}
        >
          <Text style={[styles.secondaryButtonText, isFirst && styles.disabledButtonText]}>이전</Text>
        </Pressable>

        {isLast ? (
          <Pressable style={styles.primaryButton} onPress={() => router.push(`/quiz/${item.id}`)}>
            <Text style={styles.primaryButtonText}>퀴즈 풀기</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.primaryButton}
            onPress={() => setCurrentIndex((value) => Math.min(value + 1, item.cards.length - 1))}
          >
            <Text style={styles.primaryButtonText}>다음</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
    padding: 20,
    paddingBottom: 34
  },
  emptyContainer: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
    textAlign: 'center'
  },
  headerCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 18,
    padding: 20
  },
  headerTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  bookmarkButton: {
    backgroundColor: colors.background,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  bookmarkText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800'
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 33,
    marginBottom: 10
  },
  summary: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23
  },
  whyBox: {
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    marginBottom: 18,
    padding: 16
  },
  whyLabel: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 7
  },
  whyText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23
  },
  progressWrap: {
    gap: 8,
    marginBottom: 16
  },
  progressText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'right'
  },
  cardBox: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 300,
    padding: 24
  },
  cardStep: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 14
  },
  cardTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 32,
    marginBottom: 18
  },
  cardBody: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 30
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    flex: 1,
    paddingVertical: 16
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900'
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 16
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900'
  },
  disabledButton: {
    opacity: 0.45
  },
  disabledButtonText: {
    color: colors.muted
  }
});
