import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '../../src/constants/colors';

type TabIconName = keyof typeof Ionicons.glyphMap;

function tabIcon(name: TabIconName, focusedName: TabIconName) {
  return ({ color, focused }: { color: string; focused: boolean; size: number }) => (
    <Ionicons name={focused ? focusedName : name} color={color} size={22} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarItemStyle: {
          height: 52,
          justifyContent: 'center',
          paddingVertical: 3
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
          lineHeight: 13,
          marginTop: 0
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 4,
          paddingTop: 4
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          tabBarIcon: tabIcon('home-outline', 'home')
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '탐색',
          tabBarIcon: tabIcon('compass-outline', 'compass')
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          title: '복습',
          tabBarIcon: tabIcon('refresh-circle-outline', 'refresh-circle')
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: '마이',
          tabBarIcon: tabIcon('person-outline', 'person')
        }}
      />
    </Tabs>
  );
}
