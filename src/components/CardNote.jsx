import { View, StyleSheet, Text } from "react-native";

const CardNote = ({ title, description }) => {
  console.log("CardNote props title:", typeof title);
  console.log("CardNote props description:", typeof description);
  return (
    <View style={{backgroundColor: "#29A678", padding: 10, marginBottom: 10, height: 80}}>
      <Text style={{fontWeight: "bold", color: "#fff", fontSize: 20}} >{title}</Text>
      <Text style={{color: "#fff", fontSize: 16}} >{description}</Text>
    </View>
  );
};



export default CardNote;
