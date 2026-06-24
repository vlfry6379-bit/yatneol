import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../src/components/AppHeader';
import { CategoryChip } from '../../src/components/CategoryChip';
import { colors } from '../../src/constants/colors';
import { useLearning } from '../../src/state/LearningContext';

export default function MyScreen() {
  const { bookmarkedIds, completedIds, quizResults } = useLearning();
  const stats = useMemo(() => {
    const answeredCount = Object.keys(quizResults).length;
    const correctCount = Object.values(quizResults).filter((result) => result.isCorrect).length;
    const accuracy = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);

    return [
      { label: '총 학습 개수', value: `${completedIds.length}개` },
      { label: '퀴즈 정답률', value: `${accuracy}%` },
      { label: '북마크 수', value: `${bookmarkedIds.length}개` },
      { label: '오늘 완료', value: `${completedIds.length}개` }
    ];
  }, [bookmarkedIds.length, completedIds.length, quizResults]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader title="마이" subtitle="얕넓 학습 기록을 가볍게 확인해요." />

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>관심 카테고리</Text>
        <View style={styles.chips}>
          <CategoryChip label="경제" />
          <CategoryChip label="AI/기술" />
          <CategoryChip label="심리" />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>앱 컨셉</Text>
        <Text style={styles.body}>
          얕넓은 하루 3분 동안 카드 3장으로 세상을 이해하는 지식 앱입니다. 지금은 로컬 더미데이터로만 동작합니다.
        </Text>
      </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18
  },
  statCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '47%',
    padding: 18
  },
  statValue: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 6
  },
  statLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700'
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 18
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22
  }
});
