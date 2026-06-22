import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';

type CategoryChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function CategoryChip({ label, selected = false, onPress }: CategoryChipProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.selectedChip,
        pressed && onPress && styles.pressed
      ]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  );
}

const baseChip: ViewStyle = {
  alignSelf: 'flex-start',
  borderRadius: 999,
  paddingHorizontal: 12,
  paddingVertical: 7
};

const styles = StyleSheet.create({
  chip: {
    ...baseChip,
    backgroundColor: colors.chip
  },
  selectedChip: {
    backgroundColor: colors.primary
  },
  pressed: {
    opacity: 0.78
  },
  text: {
    color: colors.chipText,
    fontSize: 12,
    fontWeight: '800'
  },
  selectedText: {
    color: '#FFFFFF'
  }
});
