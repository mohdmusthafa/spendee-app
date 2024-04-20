import { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isAfter } from 'date-fns';


export default function NextMealCard() {
  const [nextMealTime, setNextMealTime] = useState(null);
  const [nextMealName, setNextMealName] = useState(null);

  const isNextMeal = (meal) => {
    return isAfter(new Date(meal.date), new Date());
  }

  useEffect(() => {
    async function getNextMeal() {
      const mealsJSON = await AsyncStorage.getItem('meals');
      const meals = JSON.parse(mealsJSON) || [];
      const nextMeal = meals.find(isNextMeal);
      if (nextMeal) {
        setNextMealTime(nextMeal.time);
        setNextMealName(nextMeal.meal);
      }
    }

    getNextMeal();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Next Meal</Text>
      </View>
      <View style={styles.mealContainer}>
        <Text style={styles.mealTimeText}>{nextMealTime}</Text>
        <Text style={styles.mealNameText}>{nextMealName}</Text>
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
    // backgroundColor: 'red',
    width: '90%',
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