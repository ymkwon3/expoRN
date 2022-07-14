import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
console.log(SCREEN_WIDTH)

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>위치</Text>
      </View>
      <ScrollView 
      contentContainerStyle={styles.weather} 
      showsHorizontalScrollIndicator={false}
      horizontal 
      pagingEnabled
      >
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨</Text>
        </View>
      </ScrollView>
      <StatusBar ></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'tomato'
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 48,
    fontWeight: '600',
  },
  weather: {
  },
  day: {
    width : SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 68,
    fontWeight: '600',
  },
  description: {
    fontSize: 38
  },
});
