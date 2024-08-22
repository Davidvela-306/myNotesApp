import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";

const CardNote = ({
  title,
  description,
  dropNote,
  editNote,
  setNewNoteData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    setNewNoteData({
      title: newTitle,
      description: newDescription,
    });
  }, [newTitle, newDescription]);
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{
                  width: "90%",
                  height: 40,
                  marginBottom: 10,
                  paddingHorizontal: 8,
                  fontSize: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  fontWeight: "bold",
                }}
                placeholder="Título"
                value={newTitle}
                onChangeText={(text) => setNewTitle(text)}
              />
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="close" size={20} color="black" />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <TextInput
                style={{
                  flex: 1,
                  width: "100%",
                  height: 300,
                  marginBottom: 10,
                  paddingHorizontal: 8,
                  minHeight: 300,
                  paddingHorizontal: 8,
                  textAlignVertical: "top",
                }}
                placeholder="Descripción de la nota"
                value={newDescription}
                onChangeText={(text) => setNewDescription(text)}
              />
            </ScrollView>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Pressable
                onPress={() => {
                  dropNote();
                  setModalVisible(!modalVisible);
                }}
                style={{ padding: 5 }}
              >
                <AntDesign name="delete" size={24} color="red" />
              </Pressable>
              <Pressable
                onPress={() => {
                  editNote();
                  setModalVisible(!modalVisible);
                }}
                style={{ padding: 5 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    backgroundColor: "#30F2AB",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <AntDesign name="check" size={24} color="green" style={{}} />
                  <Text style={{ color: "green", fontSize: 16 }}>
                    GuardarCambios
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View
          style={{
            backgroundColor: `${modalVisible ? "#468C73" : "#29A678"}`,
            padding: 10,
            marginBottom: 10,
            height: 80,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 20 }}>
            {title ? title : "Nota sin título..."}
          </Text>
          <Text style={{ color: "#fff", fontSize: 16 }}>
            {description ? description : "Sin descripción..."}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  input: {
    width: "90%",
    height: 30,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    paddingLeft: 10,
  },
  //
});

export default CardNote;
