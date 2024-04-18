import { Pressable, View, Text, StyleSheet } from "react-native";

export default function PillButton({ label }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable>
        <Text>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
    backgroundColor: 'red'
  }
})