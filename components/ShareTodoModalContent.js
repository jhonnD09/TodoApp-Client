import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

function ShareTodoModalContent({ id, title, completed, shared_with_id }) {
  const [author, setAuthor] = useState({});
  const [shareWith, setShareWith] = useState({});
  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const response = await fetch(
      `http://192.168.1.106:8080/todos/shared_todos/${id}`,
      {
        method: "GET",
      }
    );
    const { author, shared_with } = await response.json();
    setAuthor(author);
    setShareWith(shared_with);
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.titles, { marginBottom: 20 }]}>Shared Tasks</Text>
      <Text style={[styles.titles, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={[styles.titles]}>Status</Text>
      <View
        style={[
          styles.status,
          { backgroundColor: completed === 1 ? "#4ade80" : "#f87171" },
        ]}
      >
        <Text style={[styles.titles, { color: "white" }]}>
          {completed === 1 ? "Completed" : "Incompleted"}
        </Text>
      </View>
      <Text style={[styles.description]}>PARTICIPANTS</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "white" }]}>
            {author.name}
          </Text>
        </View>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "white" }]}>
            {shareWith?.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  titles: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "900",
    color: "black",
  },
  participant: {
    backgroundColor: "#8b5cf6",
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
  status: {
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
});

export default ShareTodoModalContent;
