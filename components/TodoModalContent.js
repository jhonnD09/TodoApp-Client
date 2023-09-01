import React, { useState } from "react";
import { Alert, Button, Keyboard, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function TodoModalContent({ id, title }) {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(
      "http://192.168.1.103:8080/todos/shared_todos",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          todo_id: id,
          user_id: 1,
          email: email,
        }),
      }
    );
    const data = response.json();
    console.log(data);
    Keyboard.dismiss();
    setEmail("");
    setFocus(false);
    Alert.alert(
      "Congratulations 🎉",
      `your successfully shared ${title} with ${email}`,
      [{ text: "Okay" }]
    );
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Shared your Task</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={styles.description}>
        Enter yhe email of the user you want to share your task with. Shrare a
        task with someone and stay in sinc with your goals everyday.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="email-address"
        style={[
          styles.input,
          focus && { borderWidth: 3, borderColor: "black" },
        ]}
        placeholder="Enter your contact email"
      />
      <Button
        onPress={handleSubmit}
        title="Share"
        disabled={email.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
});
