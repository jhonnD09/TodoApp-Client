import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Animated,
  Keyboard,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function InputTask({ todos, setTodos }) {
  const [showEmojis, setShowEmojis] = useState(true);
  const [messageBody, setMessageBody] = useState("");
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setShowEmojis(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setShowEmojis(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSubmit = async () => {
    if (!messageBody) {
      return;
    } else {
      try {
        const response = await fetch("http://192.168.1.103:8080/todos", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            user_id: 1,
            title: messageBody,
          }),
        });
        const newTodo = await response.json();
        setTodos([...todos, { ...newTodo, shared_with_id: null }]);
        Keyboard.dismiss();
        setMessageBody("");
        restartApp();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const RenderEmoji = ({ emoji }) => {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={"transparent"}
        onPress={() => {
          setMessageBody(messageBody + emoji);
        }}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {showEmojis && (
          <Animated.View
            style={[styles.emojiesContainer, { opacity: fadeAnim }]}
          >
            <RenderEmoji emoji="✅" />
            <RenderEmoji emoji="🚨" />
            <RenderEmoji emoji="📑" />
            <RenderEmoji emoji="🛒" />
            <RenderEmoji emoji="🏃🏽‍♂️" />
            <RenderEmoji emoji="🎉" />
            <RenderEmoji emoji="🎁" />
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write a new task"
            scrollEnabled={true}
            onChangeText={setMessageBody}
            defaultValue={messageBody}
          />
          <Pressable onPress={handleSubmit}>
            <AntDesign
              name="checkcircle"
              size={40}
              color={messageBody ? "black" : "#00000050"}
              style={{ paddingLeft: 5 }}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderTopColor: "#00000030",
    alignItems: "baseline",
  },
  emojiesContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingVertical: 10,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 25,
    paddingVertical: 5,
    marginRight: 10,
  },
  containerTextInput: {
    width: windowWidth - 100,
    borderWidth: 1,
    borderRadius: 30,
    minHeight: 45,
    paddingHorizontal: 15,
    paddingTop: 8,
    marginTop: 5,
    fontSize: 16,
    paddingVertical: 5,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    marginBottom: 5,
    fontWeight: "600",
  },
});

export default InputTask;
