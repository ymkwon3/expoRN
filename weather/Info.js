import { View, Text, Dimensions, StyleSheet } from "react-native";
import moment from "moment";
import { Fontisto } from "@expo/vector-icons";

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

export default function Info({ day, index }) {
  return (
    <View style={styles.day}>
      <Text style={styles.date}>
        {moment(moment.unix(day.dt).valueOf()).format("MM월 DD일")}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.temp}>
          {parseFloat(day.temp.day).toFixed(1)}°C
        </Text>
        <Fontisto
          name={icons[day.weather[0].main]}
          size={68}
          color={"#fff"}
        />
      </View>
      <Text style={styles.description}>{day.weather[0].main}</Text>
      <Text style={styles.tinyText}>{day.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  day: {
    width: SCREEN_WIDTH - 40,
  },
  date: {
    fontSize: 38,
    fontWeight: "600",
    color: "#fff",
  },
  temp: {
    marginTop: 50,
    fontSize: 68,
    fontWeight: "600",
    color: "#fff",
  },
  description: {
    fontSize: 38,
    color: "#fff",
  },
  tinyText: {
    fontSize: 18,
    color: "#fff",
  },
});
