import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '../src/components/AppHeader';
import { colors } from '../src/constants/colors';
import { categories } from '../src/data/knowledgeData';

export default function OnboardingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>얕넓</Text>
        <AppHeader
          title="얕고 넓은 지식을 하루 3분만"
          subtitle="경제, 역사, 과학, 심리, AI까지. 오늘의 카드 3장으로 가볍게 배워요."
        />
      </View>

      <Text style={styles.sectionTitle}>관심 있는 분야를 골라보세요</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <View key={category} style={styles.categoryBox}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.button} onPress={() => router.replace('/tabs/home')}>
        <Text style={styles.buttonText}>오늘의 지식 보러가기</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
    padding: 22,
    paddingTop: 32
  },
  hero: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
    padding: 24
  },
  logo: {
    color: colors.primary,
    fontSize: 38,
    fontWeight: '900',
    marginBottom: 22
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28
  },
  categoryBox: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 13
  },
  categoryText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700'
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 16
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  }
});
