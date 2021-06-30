/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App = () => {



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList" screenOptions={{headerTitleAlign: 'center', cardStyle:{backgroundColor:'black'}}}>
        <Stack.Screen name="MovieList" component={MovieList} options={
          {
            title: 'Movie List',
            headerTintColor:'white',
            headerStyle:{
              backgroundColor:'black'
            }
        
          }
        } />
        <Stack.Screen name="MovieDetail" component={MovieDetail} options={
          {
            title: 'Movie Detail',
            headerTintColor:'white',
            headerStyle:{
              backgroundColor:'black'
            }
          }
        } />
      </Stack.Navigator>
    </NavigationContainer>
      
    
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
