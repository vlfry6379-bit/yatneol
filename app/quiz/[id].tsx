import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { QuizOption } from '../../src/components/QuizOption';
import { colors } from '../../src/constants/colors';
import { findKnowledgeById } from '../../src/data/knowledgeData';

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useMemo(() => (id ? findKnowledgeById(id) : undefined), [id]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!item) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>퀴즈를 찾을 수 없어요</Text>
        <Text style={styles.emptyText}>존재하지 않는 콘텐츠이거나 아직 준비 중인 퀴즈입니다.</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.replace('/tabs/home')}>
          <Text style={styles.primaryButtonText}>홈으로 돌아가기</Text>
        </Pressable>
      </View>
    );
  }

  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === item.quiz.answerIndex;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.label}>오늘의 퀴즈</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.question}>{item.quiz.question}</Text>
      </View>

      <View>
        {item.quiz.options.map((option, index) => {
          const optionLabel = `${String.fromCharCode(65 + index)}. ${option}`;

          return (
            <QuizOption
              key={option}
              label={optionLabel}
              selected={selectedIndex === index}
              disabled={isAnswered}
              isCorrect={isAnswered && index === item.quiz.answerIndex}
              isWrong={isAnswered && selectedIndex === index && selectedIndex !== item.quiz.answerIndex}
              onPress={() => setSelectedIndex(index)}
            />
          );
        })}
      </View>

      {isAnswered ? (
        <View style={[styles.resultBox, isCorrect ? styles.correctBox : styles.wrongBox]}>
          <Text style={[styles.resultTitle, isCorrect ? styles.correctText : styles.wrongText]}>
            {isCorrect ? '정답이에요' : '아쉬워요'}
          </Text>
          <Text style={styles.explanation}>{item.quiz.explanation}</Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={() => router.replace(`/knowledge/${item.id}`)}>
          <Text style={styles.secondaryButtonText}>다시 보기</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={() => router.replace('/tabs/home')}>
          <Text style={styles.primaryButtonText}>홈으로</Text>
        </Pressable>
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
  label: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 10
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 30,
    marginBottom: 14
  },
  question: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 28
  },
  resultBox: {
    borderRadius: 8,
    marginTop: 12,
    padding: 18
  },
  correctBox: {
    backgroundColor: '#DCFCE7'
  },
  wrongBox: {
    backgroundColor: '#FEE2E2'
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8
  },
  correctText: {
    color: colors.success
  },
  wrongText: {
    color: colors.danger
  },
  explanation: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23
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
  }
});
