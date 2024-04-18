import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import NextMealCard from '../components/NextMealCard';
import UpcomingMeals from '../components/UpcomingMeals';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';


export default function App() {
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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Hello there</Text>
        <Text style={styles.usernameText}>Mohammed Musthafa</Text>
      </View>
      <NextMealCard />
      <UpcomingMeals />
      <Link href="add-meal" asChild>
        <Pressable>
          <View style={styles.addButtonContainer}>
            <FontAwesome
              name="plus"
              size={18}
              color="#283240"
            />
          </View>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040509',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
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
  usernameText: {
    color: '#D6E2FF',
    fontSize: 32,
    fontFamily: 'DMSansBold'
  },
  addButtonContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#BDC6DB',
    position: 'absolute',
    bottom: 10,
    left: 120
  }
});
