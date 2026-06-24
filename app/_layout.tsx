import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../src/constants/colors';
import { LearningProvider } from '../src/state/LearningContext';

export default function RootLayout() {
  return (
    <LearningProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ title: '시작하기' }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="knowledge/[id]" options={{ title: '지식 카드' }} />
        <Stack.Screen name="quiz/[id]" options={{ title: '퀴즈' }} />
      </Stack>
    </LearningProvider>
  );
}
