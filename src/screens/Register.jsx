import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import { ref, set } from "firebase/database";
import { database } from "../auth/firebase";
import { AuthContext } from "../context/AuthContext"; // Importa el contexto
import { updateProfile } from "firebase/auth";
const Register = ({ navigation }) => {
  const [name, setName] = useState(""); // Nuevo estado para el nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext); // Obtén la función de registro del contexto

  const handleRegister = async () => {
    try {
      // Valida el correo y la contraseña antes de intentar el registro
      if (!email.includes("@") || password.length < 6) {
        alert(
          "Por favor, introduce un correo válido y una contraseña de al menos 6 caracteres."
        );
        return;
      }
      try {
        const userCredentials = await register(email, password);

        const { user } = userCredentials;

        await updateProfile(user, {
          displayName: name,
        });

        // Almacenar usuario en Realtime Database
        await set(ref(database, "users/" + user.uid), {
          email: user.email,
          name: name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        Alert.alert("Registro exitoso", "Usuario registrado exitosamente");
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Dashboard");
      } catch (error) {
        Alert.alert("Error:", error.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/register.png")}
        style={styles.image}
      ></Image>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleRegister} color={"#30F2AB"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#3C3C40",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default Register;
