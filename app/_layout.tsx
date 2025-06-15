import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
        headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "お散歩アプリ",
        }}
      />
      <Stack.Screen
        name="walk"
        options={{
          headerTitle: "散歩の詳細",
        }}
      />
    </Stack>
  );
}
