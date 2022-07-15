import { StatusBar } from "expo-status-bar";
import {
 StyleSheet, View,
} from "react-native";
import Weather from "./weather/Weather";



export default function App() {
  return (
   <View style={styles.container}>
      <Weather></Weather>
      
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