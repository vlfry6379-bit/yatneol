import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../src/components/AppHeader';
import { KnowledgeListCard } from '../../src/components/KnowledgeListCard';
import { ProgressBar } from '../../src/components/ProgressBar';
import { colors } from '../../src/constants/colors';
import { todayKnowledgeItems } from '../../src/data/knowledgeData';

export default function HomeScreen() {
  const completedCount = 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader title="오늘의 얕넓 지식" subtitle="하루 3분, 세상을 이해하는 카드 3장" />

      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <Text style={styles.progressTitle}>
            오늘 {completedCount} / {todayKnowledgeItems.length} 완료
          </Text>
          <Text style={styles.streak}>현재 1일 연속 학습 중</Text>
        </View>
        <ProgressBar current={completedCount} total={todayKnowledgeItems.length} />
      </View>

      <View style={styles.list}>
        {todayKnowledgeItems.map((item) => (
          <KnowledgeListCard key={item.id} item={item} />
        ))}
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
  progressCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 18,
    padding: 18
  },
  progressTop: {
    gap: 8,
    marginBottom: 12
  },
  progressTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800'
  },
  streak: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: '800'
  },
  list: {
    paddingBottom: 24
  }
});
