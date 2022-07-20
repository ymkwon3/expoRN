import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet, View, TouchableOpacity, Text
} from "react-native";
import Weather from "./weather/Weather";
import Work from "./work/Work";

import { theme } from "./color";
import { storeData, getData } from "./Storage";

const CATEGORY_KEY = "@category";

export default function App() {
  const [category, setCategory] = useState("work");
  const work = () => {
    setCategory("work");
    storeData(CATEGORY_KEY, "work");
  }
  const weather = () => {
    setCategory("weather");
    storeData(CATEGORY_KEY, "weather");
  }

  useEffect(() => {
    (async function init() {
      const data = await getData(CATEGORY_KEY);
      setCategory(data ? data : "work");
    })();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text
            style={{
              ...styles.btnText,
              color: category === "work" ? "white" : theme.grey
            }}
            onPress={work}
          >
            ToDo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              ...styles.btnText,
              color: category === "weather" ? "white" : theme.grey,
            }}
            onPress={weather}
          >
            Weather
          </Text>
        </TouchableOpacity>
      </View>
      {category === "work" && <Work></Work>}
      {category === "weather" && <Weather></Weather>}

      <StatusBar style="light"></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
})