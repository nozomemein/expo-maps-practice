import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocation } from "../hooks/useLocation";

// モックデータ
const mockWalks = [
  {
    id: 1,
    name: "朝の散歩",
    startTime: new Date("2024-03-15T06:00:00").getTime(),
    endTime: new Date("2024-03-15T07:00:00").getTime(),
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "夕方の散歩",
    startTime: new Date("2024-03-15T17:00:00").getTime(),
    endTime: new Date("2024-03-15T18:00:00").getTime(),
    image: "https://picsum.photos/200/300",
  },
];

export default function HomeScreen() {
  const { errorMsg, isTracking, startTracking, stopTracking } = useLocation();
  const [walks] = useState(mockWalks);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>お散歩アプリ</Text>

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      <TouchableOpacity
        style={[
          styles.button,
          isTracking ? styles.stopButton : styles.startButton,
        ]}
        onPress={isTracking ? stopTracking : startTracking}
      >
        <Text style={styles.buttonText}>
          {isTracking ? "散歩を終了" : "散歩を開始"}
        </Text>
      </TouchableOpacity>

      <View style={styles.walksList}>
        <Text style={styles.sectionTitle}>過去の散歩</Text>
        {walks.map((walk) => (
          <TouchableOpacity
            key={walk.id}
            style={styles.walkItem}
            onPress={() => router.push(`/walk/${walk.id}`)}
          >
            <Image source={{ uri: walk.image }} style={styles.walkImage} />
            <View style={styles.walkInfo}>
              <Text style={styles.walkName}>{walk.name}</Text>
              <Text style={styles.walkDate}>
                {new Date(walk.startTime).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#4CAF50",
  },
  stopButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  walksList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  walkItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  walkImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  walkInfo: {
    flex: 1,
  },
  walkName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  walkDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
