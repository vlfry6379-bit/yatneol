import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';

type QuizOptionProps = {
  label: string;
  selected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export function QuizOption({
  label,
  selected,
  isCorrect = false,
  isWrong = false,
  disabled = false,
  onPress
}: QuizOptionProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        selected && styles.selected,
        isCorrect && styles.correct,
        isWrong && styles.wrong,
        pressed && !disabled && styles.pressed
      ]}
    >
      <Text style={[styles.text, (isCorrect || isWrong || selected) && styles.strongText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 15
  },
  selected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary
  },
  correct: {
    backgroundColor: '#DCFCE7',
    borderColor: colors.success
  },
  wrong: {
    backgroundColor: '#FEE2E2',
    borderColor: colors.danger
  },
  pressed: {
    opacity: 0.86
  },
  text: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  strongText: {
    fontWeight: '800'
  }
});
