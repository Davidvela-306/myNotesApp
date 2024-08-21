import React, { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Dashboard = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <View>
      <Text>Bienvenido, {user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Dashboard;
