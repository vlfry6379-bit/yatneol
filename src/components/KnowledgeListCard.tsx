import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { CategoryChip } from './CategoryChip';
import { colors } from '../constants/colors';
import type { KnowledgeItem } from '../types/knowledge';

type KnowledgeListCardProps = {
  item: KnowledgeItem;
  completed?: boolean;
};

export function KnowledgeListCard({ item, completed = false }: KnowledgeListCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => router.push(`/knowledge/${item.id}`)}
    >
      <View style={styles.topRow}>
        <CategoryChip label={item.category} />
        {completed ? <Text style={styles.completed}>완료</Text> : null}
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>난이도 {item.difficulty}</Text>
        <Text style={styles.meta}>예상 {item.estimatedMinutes}분</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    marginBottom: 14,
    padding: 18,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.995 }]
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  completed: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '800'
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 27
  },
  summary: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600'
  }
});
