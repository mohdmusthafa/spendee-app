import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { parse } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { useState } from 'react';
import NextMealCard from '../components/NextMealCard';
import UpcomingMeals from '../components/UpcomingMeals';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import PillButton from '../components/PillButton';


export default function AddMeal() {
  const [mealTime, setMealTime] = useState('Breakfast');
  const [mealDay, setMealDay] = useState((new Date().getDate()).toString());
  const [mealMonth, setMealMonth] = useState((new Date().toLocaleString('default', { month: 'long' })));
  const [mealName, setMealName] = useState(null);

  const [fontsLoaded, fontError] = useFonts({
    DMSansRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    DMSansBold: require('../assets/fonts/DMSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const addMeal = async () => {
    try {
      const mealsJSON = await AsyncStorage.getItem('meals');
      const meals = JSON.parse(mealsJSON) || [];

      const timings = {
        Breakfast: '08:00',
        Lunch: '12:00',
        Dinner: '18:00'
      }
      const mealYear = new Date().getFullYear();
      const dateString = `${mealYear}-${mealMonth}-${mealDay} ${timings[mealTime]}`;
      const parsedDate = parse(dateString, 'yyyy-MMMM-dd HH:mm', new Date());
      const timeZonedDate = formatInTimeZone(
        parsedDate,
        'Asia/Kolkata',
        'yyyy-MM-dd HH:mm'
      );


      console.log(timeZonedDate)
      meals.push({
        id: meals.length + 1,
        date: timeZonedDate,
        time: mealTime,
        meal: mealName
      });

      const sortedMeals = meals.sort((a, b) => new Date(a.date) - new Date(b.date));
      await AsyncStorage.setItem('meals', JSON.stringify(sortedMeals));
      router.replace('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Add Meal</Text>
        </View>
        <View style={styles.mealDateContainer}>
          <TextInput
            style={styles.mealDayInput}
            onChangeText={setMealDay}
            value={mealDay}
            inputMode='numeric'
            placeholder="Day"
            placeholderTextColor="#494949"
          />
          <Text style={styles.mealDayInput}>/</Text>
          <TextInput
            style={styles.mealDayInput}
            onChangeText={setMealMonth}
            value={mealMonth}
            placeholder="Month"
            placeholderTextColor="#494949"
          />
        </View>
        <View style={styles.mealTimeContainer}>
          <PillButton
            label="Breakfast"
            selected={mealTime === 'Breakfast'}
            onPress={() => setMealTime('Breakfast')}
          />
          <PillButton
            label="Lunch"
            selected={mealTime === 'Lunch'}
            onPress={() => setMealTime('Lunch')}
          />
          <PillButton
            label="Dinner"
            selected={mealTime === 'Dinner'}
            onPress={() => setMealTime('Dinner')}
          />
        </View>
        <View style={styles.mealNameContainer}>
          <TextInput
            style={styles.mealNameInput}
            placeholder="Meal name"
            placeholderTextColor="#494949"
            multiline={true}
            onChangeText={setMealName}
            value={mealName}
          />
        </View>
        <View style={styles.addMealButtonContainer}>
          <Pressable onPress={addMeal}>
            <Text>Add Meal</Text>
          </Pressable>
        </View>
        <Link href="/" asChild>
          <Pressable>
            <View style={styles.addButtonContainer}>
              <FontAwesome
                name="home"
                size={18}
                color="#283240"
              />
            </View>
          </Pressable>
        </Link>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040509',
    // backgroundColor: 'red',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleContainer: {
    // position: 'absolute',
    // top: 40,
    // left: 20
    marginBottom: 10
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'DMSansBold'
  },
  addButtonContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#BDC6DB',
    position: 'absolute',
    // bottom: 0,
    top: 130,
    left: 120,
  },
  mealTimeContainer: {
    width: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  mealDayInput: {
    fontSize: 24,
    fontFamily: 'DMSansBold',
    color: '#fff',
  },
  mealDateContainer: {
    // backgroundColor: 'red',
    marginBottom: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  mealNameContainer: {
    width: '90%',
    maxHeight: 100,
    // backgroundColor: 'red'
  },
  mealNameInput: {
    fontSize: 32,
    fontFamily: 'DMSansBold',
    color: '#fff',
    // marginBottom: 10,
    // backgroundColor: 'red',
    height: '100%',
    textAlign: 'center'
  },
  addMealButtonContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#BDC6DB',
  }
});
