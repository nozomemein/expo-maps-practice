import * as Location from "expo-location";
import { useEffect, useState } from "react";

export type LocationData = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("位置情報の使用許可が必要です");
        return;
      }
    })();
  }, []);

  const startTracking = async () => {
    try {
      setIsTracking(true);
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            timestamp: newLocation.timestamp,
          });
        }
      );

      return () => {
        locationSubscription.remove();
        setIsTracking(false);
      };
    } catch (error) {
      setErrorMsg("位置情報の取得に失敗しました");
      setIsTracking(false);
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  return {
    location,
    errorMsg,
    isTracking,
    startTracking,
    stopTracking,
  };
};
