import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Navigators
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Components
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';

import Home from '../pages/Home/home';
import AllProductsList from '../pages/AllProducts/AllProducts';

import Items from '../pages/ItemsFromCategory/Items';
import CreateItem from '../components/CreateItem/CreateItem';

import CreateProductCategory from '../components/CreateCategory/createcategory';

// styles
import {colors} from '../styles/index';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NavigatorOptions = {
  activeTintColor: '#fff',
  inactiveTintColor: '#ffffff80',
  showLabel: false,
  style: {
    backgroundColor: colors.main,
  },
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerTintColor: colors.secondary,
        headerStyle: {backgroundColor: colors.main},
        cardStyle: {backgroundColor: colors.secondary},
      }}>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.secondary,
          },
        }}
        component={Home}
      />
      <Stack.Screen name="Items" component={Items} />
      <Stack.Screen
        name="CreateProductCategory"
        options={{
          title: 'Criar Categoria',
        }}
        component={CreateProductCategory}
      />
      <Stack.Screen
        name="CreateItem"
        options={{
          title: 'Criar Item',
        }}
        component={CreateItem}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={NavigatorOptions}
        sceneContainerStyle={{backgroundColor: '#fff'}}>
        <Tab.Screen
          name="Main"
          component={StackNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Icon name="home" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AllProducts"
          component={AllProductsList}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <IconE name="shopping-bag" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
