import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { AuthContext } from "../context/AuthContext";

import { ref, set } from "firebase/database";
import { database } from "../auth/firebase";



const Dashboard = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  console.log("database", database);

  console.log("displayName", user.displayName);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  const handleDelete = () => console.log("Delete");
  const handleEdit = () => console.log("Edit");

  return (
    <SafeAreaView
      style={[styles.container, modalVisible && styles.modalBackground]}
    >
      <View style={styles.header}>
        <Text>Hola, {user?.displayName}</Text>
        <MaterialIcons
          name="logout"
          size={24}
          color={modalVisible ? "rgba(0, 0, 0, 0.5)" : "#FF0004"}
          onPress={logout}
        />
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TextInput style={styles.modalInput} placeholder="Note title" />
                <View style={styles.iconContainer}>
                  <Pressable onPress={handleDelete}>
                    <AntDesign name="delete" size={20} color="#FF0004" />
                  </Pressable>
                  <Pressable onPress={() => setModalVisible(false)}>
                    <AntDesign name="close" size={20} color="black" />
                  </Pressable>
                </View>
              </View>

              <ScrollView contentContainerStyle={styles.scrollView}>
                <TextInput
                  style={styles.textInput}
                  placeholder={"___________________________\n".repeat(10)}
                  multiline
                />
              </ScrollView>
              <Pressable onPress={handleEdit} style={{ flexDirection: "row" , alignItems: "center", gap: 15, padding: 10, backgroundColor: "#30F2AB", borderRadius: 10}}>
                <Text style={styles.editText}>Guardar Cambios</Text>
                <Feather name="edit" size={20} color="#000" />
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.buttonOpen, modalVisible && styles.buttonOpenActive]}
          onPress={() => setModalVisible(true)}
        >
          <Entypo name="circle-with-plus" size={40} style={styles.textStyle} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    width: "80%",
    height: "60%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalInput: {
    fontSize: 20,
    flex: 5,
  },
  iconContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
  },
  buttonOpen: {
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 50,
    zIndex: 100,
    backgroundColor: "#30F2AB",
  },
  buttonOpenActive: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Dashboard;
