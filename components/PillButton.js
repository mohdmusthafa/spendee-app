import { Pressable, View, Text, StyleSheet } from "react-native";

export default function PillButton({ label, selected, onPress }) {
  if (selected) {
    return (
      <View style={[styles.buttonContainer, { backgroundColor: '#3E4758', borderColor: '#3E4758' }]}>
          <Text style={styles.labelText}>{label}</Text>
      </View>
    )
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress}>
        <Text style={styles.labelText}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12
  },
  labelText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'DMSansRegular'
  }
})