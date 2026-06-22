import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../src/components/AppHeader';
import { CategoryChip } from '../../src/components/CategoryChip';
import { KnowledgeListCard } from '../../src/components/KnowledgeListCard';
import { colors } from '../../src/constants/colors';
import { categories, knowledgeItems } from '../../src/data/knowledgeData';
import type { KnowledgeCategory } from '../../src/types/knowledge';

type CategoryFilter = '전체' | KnowledgeCategory;

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('전체');

  const filteredItems = useMemo(() => {
    if (selectedCategory === '전체') {
      return knowledgeItems;
    }

    return knowledgeItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader title="탐색" subtitle="궁금한 주제를 고르고 얕고 넓게 확장해보세요." />

      <Text style={styles.sectionTitle}>카테고리</Text>
      <View style={styles.chips}>
        <CategoryChip
          label="전체"
          selected={selectedCategory === '전체'}
          onPress={() => setSelectedCategory('전체')}
        />
        {categories.map((category) => (
          <CategoryChip
            key={category}
            label={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>전체 지식</Text>
      {filteredItems.map((item) => (
        <KnowledgeListCard key={item.id} item={item} />
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
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 6
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24
  }
});
