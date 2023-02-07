import React, { useState } from "react";
import { Text, View, Alert,Button, Image, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native-gesture-handler";
import Button1 from './Button';

export default function UploadComponent(props) {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [images, setImages] = useState("");
  const [images2, setImages2] = useState([]);

  const getImages = async () => {
    let images = await firebase
      .database()
      .ref()
      .child("images") // /kgh3jqool1/preview_image
      .once("value");

    // setImages(images.val());
    let temp = [];
    // console.log(images);
    {
      Object.entries(images.val()).map(([key, value], i) => {
        temp.push(images.val()[key].preview_image);
      });
    }
    setImages2(temp)

    var rootRef = await firebase.database().ref();
    var urlRef = rootRef.child("images");
    urlRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        console.log(child.key+": "+child.val().preview_image);
      });
    });

    return;
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
      alert(result.uri);
      await firebase
        .database()
        .ref("/images/" + Math.random().toString(36).slice(2))
        .set({
          preview_image: result.uri,
        })
        .then(function (snapshot) {});
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  return (
    <View>
     
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button1 onPress={showImagePicker} theme="primary" title="Choose a photo" />
       
        <Button onPress={getImages} title="getImages" />
        {/* <Button onPress={openCamera} title="Open camera" />*/}
      </View>
      <View>
        <FlatList
          data={images2}
          contentContainerStyle={{ marginHorizontal: 20 }}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.postImage} />
          )}
        />
        
        {/* <Text style={"color: #f00"}>{images ? images.length() : "Nada ainda..."}</Text>
        
        <Text style={"color: #f00"}>
          {images ? "Existem imagens..." : "Nada ainda..."}
        </Text>
        */}
        {/* {Object.entries(images).map(([key, value], i) => {
          setImages2(images2 => [...images2, images[key].preview_image])
        })} */}
        {/* {images ? (
          <Text style={"color: #f00"}>
            {Object.entries(images).map((key, value) => {
              value;
            })}
          </Text>
        ) : (
          <Text style={"color: #f00"}>"Nada ainda..."</Text>
        ) */}
        {/* <Image source={{uri: images}} style={styles.postImage} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2a2a2a",
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  authorContainer: {
    flex: 0.1,
    flexDirection: "row",
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: RFValue(100),
  },
  authorNameContainer: {
    flex: 0.85,
    justifyContent: "center",
  },
  authorNameText: {
    color: "white",
    fontSize: RFValue(20),
  },
  postImage: {
    marginTop: RFValue(20),
    resizeMode: "contain",
    width: "100%",
    alignSelf: "center",
    height: RFValue(275),
  },
  captionContainer: {},
  captionText: {
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
