import { Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../src/screens/login";
import BusinessTypeSelection from "../src/screens/BusinessTypeSelection";
import BasicDetails from "../src/screens/BasicDetails";
// import BillingPage from '../src/screens/BillingPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BusinessTypeSelection"
            component={BusinessTypeSelection}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BasicDetails"
            component={BasicDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
