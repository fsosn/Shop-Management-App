import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePageView from './view/HomePageView';
import ProductListView from './view/ProductListView';
import ProductAddView from './view/ProductAddView';
import ProductEditView from './view/ProductEditView';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePageView">
          <Stack.Screen name="Homepage" component={HomePageView} />
          <Stack.Screen name="ProductList" component={ProductListView} />
          <Stack.Screen name="ProductAdd" component={ProductAddView} />
          <Stack.Screen name="ProductEdit" component={ProductEditView} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
