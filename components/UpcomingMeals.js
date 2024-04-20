import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAfter } from 'date-fns';

export default function UpcomingMeals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function deleteAndFetchMeals() {
      const mealsJSON = await AsyncStorage.getItem('meals');
      const meals = JSON.parse(mealsJSON) || [];
      const currentDate = new Date();
      const updatedMeals = meals.filter(meal => isAfter(new Date(meal.date), currentDate));
      setMeals(updatedMeals);
      await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
    }
    deleteAndFetchMeals();
  }, []);

  function formatDate(date) {
    date = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Upcoming Meals</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <FlatList
          data={meals}
          style={{ marginTop: 20 }}
          keyExtractor={item => Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.mealContainer}>
              <Text style={styles.mealTimeText}>{item.date && formatDate(item.date)} - {item.time}</Text>
              <Text style={styles.mealNameText}>{item.meal}</Text>
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