import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';

type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const ratio = total <= 0 ? 0 : Math.min(current / total, 1);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 9,
    backgroundColor: '#E8EDF5',
    borderRadius: 999,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999
  }
});
