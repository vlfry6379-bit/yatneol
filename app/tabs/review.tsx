import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../src/components/AppHeader';
import { KnowledgeListCard } from '../../src/components/KnowledgeListCard';
import { colors } from '../../src/constants/colors';
import { reviewKnowledgeItems } from '../../src/data/knowledgeData';
import { useLearning } from '../../src/state/LearningContext';

export default function ReviewScreen() {
  const { isCompleted } = useLearning();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader title="복습" subtitle="잊기 전에 다시 보면 더 오래 기억할 수 있어요." />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>오늘 복습할 지식</Text>
        <Text style={styles.infoText}>
          지금은 더미데이터입니다. 이후 실제 학습 기록을 기준으로 3일 전, 7일 전 복습 목록을 보여줄 수 있어요.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>3일 전 복습</Text>
      {reviewKnowledgeItems.threeDaysAgo.map((item) => (
        <KnowledgeListCard key={item.id} item={item} completed={isCompleted(item.id)} />
      ))}

      <Text style={styles.sectionTitle}>7일 전 복습</Text>
      {reviewKnowledgeItems.sevenDaysAgo.map((item) => (
        <KnowledgeListCard key={item.id} item={item} completed={isCompleted(item.id)} />
      ))}
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
  }
});
