import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "../color";
import { getData, storeData } from "../Storage";
import { Fontisto } from "@expo/vector-icons";

const STORAGE_KEY = "@todos";

export default function Work() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = payload => setText(payload);

  const addToDo = async () => {
    if (text === "") {
      return;
    }

    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    await storeData(STORAGE_KEY, newToDos);
    setText("");
  };

  const deleteToDo = (key) => {
    Alert.alert(
      "Delete ToDo",
      "Are you sure?",
      [
        { text: "cancel" },
        {
          text: "sure", onPress: async () => {
            const newToDos = { ...toDos };
            delete newToDos[key];
            await storeData(STORAGE_KEY, newToDos);
            setToDos(newToDos)
          }
        }
      ])
  }

  useEffect(() => {
    const init = async () => {
      const data = await getData(STORAGE_KEY);
      setToDos(data);
    }
    init();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
            onPress={work}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
            onPress={travel}
          >
            Study
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        onSubmitEditing={addToDo}
        value={text}
        onChangeText={onChangeText}
        returnKeyType={"done"}
        placeholder={working ? "Add a ToDo" : "Where do you want to go"}
        style={styles.input}
      ></TextInput>
      <ScrollView>
        {Object.keys(toDos).map(key => (
          toDos[key].working === working ?
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={18} color={theme.grey}></Fontisto>
              </TouchableOpacity>
            </View> : null
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.bg,
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
  input: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
