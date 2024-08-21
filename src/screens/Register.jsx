import React, { useState, useContext } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext"; // Importa el contexto

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
      await register(email, password);
      // Aquí podrías guardar el nombre del usuario en tu base de datos o como metadata en Firebase
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default Register;
