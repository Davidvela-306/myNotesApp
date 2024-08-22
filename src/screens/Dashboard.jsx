import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Alert,
  RefreshControl,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import CardNote from "../components/CardNote";
import { AuthContext } from "../context/AuthContext";
import { database } from "../auth/firebase";
import { ref, push, set, get, update, remove } from "firebase/database";

const addNote = async (userId, title, description) => {
  const notesRef = ref(database, "users/" + userId + "/notes");
  const newNoteRef = push(notesRef);

  try {
    await set(newNoteRef, {
      title: title,
      description: description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    Alert.alert("Nota añadida correctamente");
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

const getNotesByUserId = async (userId) => {
  try {
    const notesRef = ref(database, `users/${userId}/notes`);
    const snapshot = await get(notesRef);

    if (snapshot.exists()) {
      const notesObject = snapshot.val();
      const notesArray = Object.keys(notesObject).map((key) => ({
        id: key,
        ...notesObject[key],
      }));
      return notesArray;
    } else {
      console.log("No se encontraron notas para el usuario.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    return [];
  }
};

const Dashboard = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const { user, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshNotes, setRefreshNotes] = useState(false);
  const [newNoteData, setNewNoteData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!user) {
      navigation.navigate("Home");

      return;
    }
    fetchNotes();
  }, [user, navigation, modalVisible, refreshNotes]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotes();
    setRefreshing(false);
  }, [user]);

  const handleCreate = async () => {
    try {
      await addNote(user.uid, note.title, note.description);
      const updatedNotes = await getNotesByUserId(user.uid);
      setNotes(updatedNotes);
      setNote({ title: "", description: "" });
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  const handleDelete = async (noteId) => {
    try {
      const noteRef = ref(database, `users/${user.uid}/notes/${noteId}`);
      await remove(noteRef);

      Alert.alert("Éxito", "La nota ha sido eliminada.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleEdit = (idNote, data) => {
    try {
      updateNote(user.uid, idNote, data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const updateNote = (userId, noteId, updatedData) => {
    update(ref(database, `users/${userId}/notes/${noteId}`), {
      ...updatedData,
      updated_at: new Date().toISOString(),
    })
      .then(() => {
        Alert.alert("Nota actualizada correctamente");
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };
  const fetchNotes = async () => {
    if (!user) return;
    try {
      const thisNotes = await getNotesByUserId(user.uid);
      if (thisNotes) {
        setNotes(thisNotes);
      }
    } catch (error) {
      console.error("Error al obtener notas:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        modalVisible && styles.modalBackground,
        { marginTop: 30 },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 16 }}>Hola, {user?.displayName}</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Notas</Text>
        </View>
        <MaterialIcons
          name="logout"
          size={24}
          color={modalVisible ? "rgba(0, 0, 0, 0.5)" : "#FF0004"}
          onPress={logout}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ margin: 20 }}>
          {notes.length > 0 ? (
            notes.map((note) => (
              <CardNote
                key={note.id}
                title={note.title}
                description={note.description}
                dropNote={() => {
                  handleDelete(note.id);
                  setRefreshNotes(!refreshNotes);
                }}
                setNewNoteData={setNewNoteData}
                editNote={() => {
                  handleEdit(note.id, newNoteData);
                  setRefreshNotes(!refreshNotes);
                }}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 600,
              }}
            >
              <Image
                source={require("../../assets/notes.png")}
                style={{ width: 200, height: 150 }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Aún no tienes notas
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modales: */}
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
                <TextInput
                  style={styles.modalInput}
                  placeholder="Título"
                  value={note.title}
                  onChangeText={(text) => setNote({ ...note, title: text })}
                />
                <View style={styles.iconContainer}>
                  <Pressable onPress={() => setModalVisible(false)}>
                    <AntDesign name="close" size={20} color="black" />
                  </Pressable>
                </View>
              </View>

              <ScrollView contentContainerStyle={styles.scrollView}>
                <TextInput
                  style={styles.textInput}
                  placeholder={"Descripción de la nota"}
                  multiline
                  value={note.description}
                  onChangeText={(text) =>
                    setNote({ ...note, description: text })
                  }
                />
              </ScrollView>
              <Pressable
                onPress={handleCreate}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  padding: 10,
                  backgroundColor: "#30F2AB",
                  borderRadius: 10,
                }}
              >
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
    </View>
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
