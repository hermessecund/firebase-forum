import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Statistics from "./screens/Statistics";
import Questions from "./screens/Questions";
import Contents from "./screens/Contents";
import Community from "./screens/Community";
import Item from "./screens/Item";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Stack"
        component={Community}
        options={{
          headerTitleAlign: "left",
          headerTitle: "클라썸 APP 채용",
          headerTitleStyle: {
            fontSize: 19,
            fontWeight: "700",
          },
        }}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "",
          headerTitleAlign: "left",
        }}
      />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 11, color: "black", fontWeight: "500" },
          tabBarLabelPosition: "below-icon",
        }}
      >
        <Tab.Screen
          name="Community"
          component={StackScreen}
          options={{
            title: "커뮤니티",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="message-badge"
                  size={23}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="message-badge-outline"
                  size={23}
                  color="black"
                />
              ),
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Contents"
          component={Contents}
          options={{
            headerShown: true,
            headerTitleAlign: "left",
            title: "콘텐츠",
            headerTitleStyle: {
              fontSize: 19,
              fontWeight: "700",
            },
            headerShadowVisible: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="contacts"
                  size={23}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="contacts-outline"
                  size={23}
                  color="black"
                />
              ),
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Questions"
          component={Questions}
          options={{
            headerShown: true,
            headerTitleAlign: "left",
            title: "설문",
            headerTitleStyle: {
              fontSize: 19,
              fontWeight: "700",
            },
            headerShadowVisible: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons name="vote" size={23} color="black" />
              ) : (
                <MaterialCommunityIcons
                  name="vote-outline"
                  size={23}
                  color="black"
                />
              ),
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Stats"
          component={Statistics}
          options={{
            headerShown: true,
            headerTitleAlign: "left",
            title: "통계",
            headerTitleStyle: {
              fontSize: 19,
              fontWeight: "700",
            },
            headerShadowVisible: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="pie-chart" size={22} color="black" />
              ) : (
                <Ionicons name="pie-chart-outline" size={22} color="black" />
              ),
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            headerTitleAlign: "left",
            title: "설정",
            headerTitleStyle: {
              fontSize: 19,
              fontWeight: "700",
            },
            headerShadowVisible: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-settings" size={22} color="black" />
              ) : (
                <Ionicons name="ios-settings-outline" size={22} color="black" />
              ),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
