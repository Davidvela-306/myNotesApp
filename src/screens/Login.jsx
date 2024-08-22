import React, { useState, useContext } from "react";
import { View, Button, TextInput, StyleSheet, Image, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate("Dashboard");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error.message);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/login.png")}
        style={styles.image}
      ></Image>
      <Text style={styles.title}>Ingresar</Text>
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
      <Button title="Iniciar Sesión" onPress={handleLogin} color={"#30F2AB"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default Login;
