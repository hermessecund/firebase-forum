import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Item({ route }) {
  const [comment, setComment] = useState("");
  const { item } = route.params;
  const chats = item.chats;

  const renderChats = ({ item: chat }) => {
    return (
      <View style={chatStyles.chatContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text>Image</Text>
          <Text style={chatStyles.chatUser}>{item.user}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={chatStyles.chatBubble}>
            <Text>{chat.text}</Text>
          </View>
          <MaterialCommunityIcons
            name="thumb-up-outline"
            size={16}
            color="black"
          />
        </View>
        <Text style={chatStyles.chatTime}>19:37</Text>
      </View>
    );
  };

  const renderListHeader = () => {
    return (
      <View style={containers.articleContainer}>
        <Text style={texts.user}>{item.user}</Text>
        <Text style={texts.title}>{item.title}</Text>
        <Text style={texts.content}>{item.content}</Text>

        <View style={{ flexDirection: "row" }}>
          {item.tags.map((tag, index) => {
            return (
              <TouchableOpacity key={index} style={buttons.tags}>
                <Text>{tag}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flexDirection: "row", marginTop: 50, marginBottom: 20 }}>
          <TouchableOpacity style={[buttons.likes, { marginRight: 8 }]}>
            <MaterialCommunityIcons
              name="heart-circle"
              size={20}
              color="black"
            />
            <Text style={{ marginLeft: 5 }}>관심있어요 {item.marks}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={buttons.likes}>
            <MaterialCommunityIcons name="hand-clap" size={18} color="black" />
            <Text style={{ marginLeft: 5 }}>짝짝 {item.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleSubmit = async (comment) => {
    // firebase add
    await addDoc(collection(db, "comments"), {
      comment,
      createdAt: serverTimestamp(),
    });
    setComment("");
  };

  return (
    <>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChats}
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={2}
        ListHeaderComponent={renderListHeader}
      />

      <View style={postStyles.postContainer}>
        <View style={postStyles.avatarContainer}>
          <View
            style={{
              width: 25,
              height: 25,
              backgroundColor: "orange",
              borderRadius: 50,
              marginRight: 5,
            }}
          />
          <Text style={postStyles.username}>{item.user}</Text>
        </View>
        <TextInput
          style={postStyles.textInput}
          placeholder="어떤 생각을 하고 있나요?"
          maxLength={40}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <View style={postStyles.uploadContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={20}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSubmit(comment)}
            disabled={comment.length === 0}
            style={comment.length === 0 ? { opacity: 0.5 } : { opacity: 1 }}
          >
            <MaterialCommunityIcons name="send" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const containers = StyleSheet.create({
  articleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
  },
});

const texts = StyleSheet.create({
  user: { fontWeight: "600", marginBottom: 12 },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  content: { marginBottom: 10, fontSize: 13 },
  comment: {
    marginTop: 15,
    marginBottom: 3,
    opacity: 0.5,
  },
});

const buttons = StyleSheet.create({
  tags: {
    backgroundColor: "#ececec",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginRight: 7,
    fontWeight: 500,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});

const chatStyles = StyleSheet.create({
  chatContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  chatBubble: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 5,
  },
  chatUser: { fontWeight: "600", marginBottom: 5, marginLeft: 5 },
  chatTime: { fontWeight: "600", opacity: 0.7, marginTop: 5 },
});

const postStyles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ececec",
  },
  avatarContainer: {
    flexDirection: "row",
    alignContent: "center",
    paddingHorizontal: 15,
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ececec",
    marginTop: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  username: {
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  textInput: {
    paddingHorizontal: 15,
    fontSize: 15,
    marginTop: 10,
  },
});
