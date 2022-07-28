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

const TODO_KEY = "@todos";

export default function Work() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeText = payload => setText(payload);

  const addToDo = async () => {
    if (text === "") {
      return;
    }

    const newToDos = { ...toDos, [Date.now()]: { text } };
    setToDos(newToDos);
    await storeData(TODO_KEY, newToDos);
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
            await storeData(TODO_KEY, newToDos);
            setToDos(newToDos)
          }
        }
      ])
  }

  useEffect(() => {
    const init = async () => {
      const data = await getData(TODO_KEY);
      setToDos(data);
    }
    init();
  }, [])

  return (
    <View>
      <TextInput
        onSubmitEditing={addToDo}
        value={text}
        onChangeText={onChangeText}
        returnKeyType={"done"}
        placeholder={"Add a ToDo"}
        style={styles.input}
      ></TextInput>
      <ScrollView>
        {Object.keys(toDos).map(key => (
          <View key={key} style={styles.toDo}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={() => console.log("check click")}>
                <Fontisto name="check" size={20} color={theme.grey} style={styles.btn}></Fontisto>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("check click")}>
                <Fontisto name="file-1" size={20} color={theme.grey} style={styles.btn}></Fontisto>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={20} color={theme.grey} style={styles.btn}></Fontisto>
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  btn: {
    marginHorizontal: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
});

// checkbox-active, checkbox-passive