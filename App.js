import { StatusBar } from "expo-status-bar";
import {
 StyleSheet, View,
} from "react-native";
import Weather from "./weather/Weather";
import Work from "./work/Work";



export default function App() {
  return (
   <View style={styles.container}>
      {/* <Weather></Weather> */}
      <Work></Work>
      <StatusBar style="light"></StatusBar>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato"
  },
})