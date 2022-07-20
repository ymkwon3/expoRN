import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { WEATHER_APIKEY } from "../file";
import Info from "./Info";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rains",
  Drizzle: "rain",
  Snow: "snow",
  Thunderstorm: "lighting",
  Atmosphere: "cloudy-gusts",
};

export default function Weather() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const {
      [0]: { country, region },
    } = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(`${country} ${region}`);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${WEATHER_APIKEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    (async function init() {
      await getWeather();
    })()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" size="large"></ActivityIndicator>
          </View>
        ) : (
          days.map((day, index) => (
            <Info day={day} key={index}></Info>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "600",
    color: "#fff",
  },
  day: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
});
