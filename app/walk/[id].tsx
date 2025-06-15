import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";

// モックデータ
const mockWalks = [
  {
    id: 1,
    name: "朝の散歩",
    startTime: new Date("2024-03-15T06:00:00").getTime(),
    endTime: new Date("2024-03-15T07:00:00").getTime(),
    image: "https://picsum.photos/200/300",
    locations: [
      {
        latitude: 35.6812,
        longitude: 139.7671,
        timestamp: new Date("2024-03-15T06:00:00").getTime(),
      },
      {
        latitude: 35.6813,
        longitude: 139.7672,
        timestamp: new Date("2024-03-15T06:15:00").getTime(),
      },
      {
        latitude: 35.6814,
        longitude: 139.7673,
        timestamp: new Date("2024-03-15T06:30:00").getTime(),
      },
      {
        latitude: 35.6815,
        longitude: 139.7674,
        timestamp: new Date("2024-03-15T06:45:00").getTime(),
      },
      {
        latitude: 35.6816,
        longitude: 139.7675,
        timestamp: new Date("2024-03-15T07:00:00").getTime(),
      },
    ],
    photos: [
      {
        uri: "https://picsum.photos/400/300",
        timestamp: new Date("2024-03-15T06:15:00").getTime(),
      },
      {
        uri: "https://picsum.photos/400/300",
        timestamp: new Date("2024-03-15T06:45:00").getTime(),
      },
    ],
    notes: [
      {
        text: "桜がきれいに咲いていた",
        timestamp: new Date("2024-03-15T06:20:00").getTime(),
      },
      {
        text: "カフェで休憩",
        timestamp: new Date("2024-03-15T06:40:00").getTime(),
      },
    ],
  },
  {
    id: 2,
    name: "夕方の散歩",
    startTime: new Date("2024-03-15T17:00:00").getTime(),
    endTime: new Date("2024-03-15T18:00:00").getTime(),
    image: "https://picsum.photos/200/300",
    locations: [
      {
        latitude: 35.6812,
        longitude: 139.7671,
        timestamp: new Date("2024-03-15T17:00:00").getTime(),
      },
      {
        latitude: 35.6813,
        longitude: 139.7672,
        timestamp: new Date("2024-03-15T17:15:00").getTime(),
      },
      {
        latitude: 35.6814,
        longitude: 139.7673,
        timestamp: new Date("2024-03-15T17:30:00").getTime(),
      },
      {
        latitude: 35.6815,
        longitude: 139.7674,
        timestamp: new Date("2024-03-15T17:45:00").getTime(),
      },
      {
        latitude: 35.6816,
        longitude: 139.7675,
        timestamp: new Date("2024-03-15T18:00:00").getTime(),
      },
    ],
    photos: [
      {
        uri: "https://picsum.photos/400/300",
        timestamp: new Date("2024-03-15T17:15:00").getTime(),
      },
      {
        uri: "https://picsum.photos/400/300",
        timestamp: new Date("2024-03-15T17:45:00").getTime(),
      },
    ],
    notes: [
      {
        text: "夕日がきれいだった",
        timestamp: new Date("2024-03-15T17:20:00").getTime(),
      },
      {
        text: "公園で遊ぶ子供たち",
        timestamp: new Date("2024-03-15T17:40:00").getTime(),
      },
    ],
  },
];

export default function WalkDetailScreen() {
  const { id } = useLocalSearchParams();
  const walk = mockWalks.find((w) => w.id === Number(id));

  if (!walk) {
    return (
      <View style={styles.container}>
        <Text>散歩が見つかりませんでした</Text>
      </View>
    );
  }

  const coordinates = walk.locations.map((loc) => ({
    latitude: loc.latitude,
    longitude: loc.longitude,
  }));

  const startLocation = coordinates[0];
  const endLocation = coordinates[coordinates.length - 1];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{walk.name}</Text>
      <Text style={styles.date}>
        {new Date(walk.startTime).toLocaleString()}
      </Text>

      <View style={styles.mapContainer}>
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: startLocation.latitude,
            longitude: startLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Polyline
            coordinates={coordinates}
            strokeColor="#000"
            strokeWidth={3}
          />
          <Marker
            coordinate={startLocation}
            title="開始地点"
            pinColor="green"
          />
          <Marker coordinate={endLocation} title="終了地点" pinColor="red" />
        </MapView> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>写真</Text>
        <ScrollView horizontal style={styles.photosContainer}>
          {walk.photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo.uri }} style={styles.photo} />
              <Text style={styles.photoTimestamp}>
                {new Date(photo.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>メモ</Text>
        {walk.notes.map((note, index) => (
          <View key={index} style={styles.noteContainer}>
            <Text style={styles.noteText}>{note.text}</Text>
            <Text style={styles.noteTimestamp}>
              {new Date(note.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  mapContainer: {
    height: 300,
    margin: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  photosContainer: {
    flexDirection: "row",
  },
  photoContainer: {
    marginRight: 15,
  },
  photo: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  photoTimestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  noteContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 16,
  },
  noteTimestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});
