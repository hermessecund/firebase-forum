import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MockData from "../data/data.json";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Community({ navigation }) {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setItems(MockData);
  }, []);

  const handleSubmit = (content) => {
    // firebase add
    const newContent = {
      // user: "Guest",
      // title,
      content,
      // createdAt: serverTimestamp(),
      // isLiked: false,
      // likes: 0,
      // isMarked: false,
      // marks: 0,
      // chats: [],
      // comment: 0,
    };
    console.log(content);
    // await addDoc(collection(db, "posts"), {
    //   comment,
    //   createdAt: serverTimestamp(),
    // });
    setNewContent("");
  };

  const handleLikes = () => {};
  const handleMarks = () => {};

  const handleCreateDummyPosts = async () => {
    // firebase add
    const images = [
      "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/Liverpool_FC.png?alt=media&token=15b75a26-78f0-4273-802d-0515f4ad5624",
      "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/Manchester_City_FC.png?alt=media&token=4b5b4ecc-ceea-4cca-be53-81b834216f59",
      "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/Real_Madrid.png?alt=media&token=5090f78f-e8ae-43ec-a9d7-f1345cabfe84",
      "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/Paris_Saint-Germain.png?alt=media&token=04283aca-2c63-4a92-8a6b-411d8c25ed1c",
    ];

    for (let i = 0; i < 10; i++) {
      let imgArray = [];
      let tagArray = [];
      let username = "";
      let userAvatar = "";
      let commentArray = [];

      if (i % 2 == 0) {
        username = "Heung-min Son";
        userAvatar =
          "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/Tottenham_Hotspur.png?alt=media&token=d4754984-8f0d-46d7-8718-fda82ac21dbe";
      } else {
        username = "Min Jae Kim";
        userAvatar =
          "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/SSC_Napoli.png?alt=media&token=2528526d-253a-44f5-a271-561f79422b0b";
      }

      if (i % 4 == 0) {
        imgArray = [images[0]];
        tagArray = ["태그 1"];
      } else if (i % 4 == 1) {
        imgArray = [images[0], images[1], images[2], images[3]];
        tagArray = ["태그 1", "태그 2"];
      } else {
        imgArray = [];
        tagArray = ["태그 3"];
      }

      if (i % 7 == 0) {
        commentArray = [
          {
            user: "Erling Haaland",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/Manchester_City_FC.png?alt=media&token=4b5b4ecc-ceea-4cca-be53-81b834216f59",
            createdAt: Date.now(),
            text: "좋아요!",
          },
          {
            user: "Kevin De Bruyne",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/Manchester_City_FC.png?alt=media&token=4b5b4ecc-ceea-4cca-be53-81b834216f59",
            createdAt: Date.now(),
            text: "저도 좋아요!",
          },
        ];
      }

      await addDoc(collection(db, "posts"), {
        id: i,
        user: username,
        avatar: userAvatar,
        title: `제목입니다 ${i}`,
        createdAt: serverTimestamp(),
        content: `여기에 본문 내용이 들어갑니다 ${i}`,
        img: imgArray,
        tags: tagArray,
        isLiked: false,
        likes: i % 4,
        isMarked: false,
        marks: (i % 4) + 1,
        comments: commentArray,
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={containers.itemContainer}
        onPress={() => navigation.navigate("Item", { item })}
      >
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

        <Text style={texts.comment}>댓글 {item.comment}개</Text>

        <View style={containers.likesContainer}>
          <TouchableOpacity
            onPress={handleMarks}
            style={[buttons.likes, { right: 90 }]}
          >
            <MaterialCommunityIcons
              name="heart-circle"
              size={18}
              color="black"
            />
            <Text>관심있어요 {item.marks}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLikes} style={buttons.likes}>
            <MaterialCommunityIcons name="hand-clap" size={18} color="black" />
            <Text>짝짝 {item.likes}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={containers.container}>
        <TouchableOpacity onPress={handleCreateDummyPosts}>
          <Text>Create dummy posts</Text>
        </TouchableOpacity>

        {/* <Image
          style={containers.imageContainer}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/classum-native.appspot.com/o/Liverpool_FC.png?alt=media&token=15b75a26-78f0-4273-802d-0515f4ad5624",
          }}
        /> */}

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={3}
          ListHeaderComponent={
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>모든 글</Text>
            </View>
          }
          ListFooterComponent={<View style={{ marginBottom: 10 }}></View>}
        />
      </View>

      <View style={postStyles.postContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "orange",
              borderRadius: 50,
              marginRight: 5,
            }}
          />
          <Text style={postStyles.username}>Username</Text>
        </View>

        <View>
          <TextInput
            style={{ fontSize: 15, fontWeight: "600", marginVertical: 7 }}
            placeholder="제목 (선택)"
            maxLength={15}
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
          />

          <TextInput
            style={{ paddingBottom: 25 }}
            numberOfLines={3}
            placeholder="공유하고 싶은 생각이 있나요?"
            maxLength={40}
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
          />

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ececec",
              borderRadius: 15,
              padding: 5,
              marginVertical: 5,
            }}
          >
            <Text style={{ marginRight: 3 }}># </Text>
            <TextInput
              placeholder="새로운 태그"
              maxLength={10}
              value={newTag}
              onChangeText={(text) => setNewTag(text)}
            />
          </View>
        </View>

        <View style={postStyles.uploadContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={22}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSubmit(newContent)}
            disabled={newContent.length === 0}
            style={newContent.length === 0 ? { opacity: 0.5 } : { opacity: 1 }}
          >
            <MaterialCommunityIcons name="send" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const containers = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingHorizontal: 15,
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 18,
    marginVertical: 20,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  likesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "relative",
  },
  imageContainer: {
    height: 200,
    width: 200,
  },
});

const texts = StyleSheet.create({
  user: { fontWeight: "600", marginBottom: 12 },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  content: { marginBottom: 10, fontSize: 15 },
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
    borderWidth: 2,
    borderColor: "#ececec",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute",
    top: -5,
  },
});

const postStyles = StyleSheet.create({
  postContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#ececec",
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
    marginLeft: 5,
  },
  InputContainer: {
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontSize: 15,
    borderRadius: 20,
    backgroundColor: "#ececec",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
