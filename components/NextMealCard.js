import { View, StyleSheet, Text } from 'react-native';


export default function NextMealCard() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Next Meal</Text>
      </View>
      <View style={styles.mealContainer}>
        <Text style={styles.mealTimeText}>Dinner</Text>
        <Text style={styles.mealNameText}>Mashed Potatoes and French Beans</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    // padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: '100%'
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'DMSansBold'
  },
  mealContainer: {
    marginTop: 20
  },
  mealTimeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'DMSansRegular'
  },
  mealNameText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'DMSansBold'
  }
})