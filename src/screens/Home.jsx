import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Menú Superior */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={[styles.buttonText, styles.registerButtonText]}>
            Registrarse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.buttonText, styles.loginButtonText]}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido Principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido a ReciVeci Notes</Text>
        <Image
          source={require("../../assets/favicon.png")}
          style={styles.image}
        />
        <Text style={styles.description}>
          Una aplicación simple y efectiva para organizar tus notas. Mantén tus
          ideas, tareas y recordatorios en un solo lugar con ReciVeci Notes.
          ¡Comienza ahora registrándote o iniciando sesión!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#30F2AB",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#29A678",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "#fff",
    borderColor: "#29A678",
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: "#29A678",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  registerButtonText: {
    color: "#29A678",
  },
  loginButtonText: {
    color: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default Home;
