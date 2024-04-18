import { View, StyleSheet, Text, FlatList } from 'react-native';

export default function UpcomingMeals() {
  const meals = [
    {
      id: 1,
      time: 'Breakfast - Tomorrow',
      name: 'Pancakes and Syrup'
    },
    {
      id: 2,
      time: 'Lunch - Tomorrow',
      name: 'Spaghetti and Meatballs'
    },
    {
      id: 3,
      time: 'Dinner - Tomorrow',
      name: 'Mashed Potatoes and French Beans'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Upcoming Meals</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <FlatList
          data={meals}
          style={{ marginTop: 20 }}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.mealContainer}>
              <Text style={styles.mealTimeText}>{item.time}</Text>
              <Text style={styles.mealNameText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    padding: 20,
    marginTop: 20
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
    marginTop: 15
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