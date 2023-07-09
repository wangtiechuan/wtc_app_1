import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { Button, ThemeProvider, Header } from "@rneui/themed";

import { Formik } from "formik";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function DetailsScreen({ navigation, route }) {
  console.log("params", route.params);
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("details", { b: 1, merge: true })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("details", { a: 1 })}
      />
      <MyReactNativeForm />
    </View>
  );
}

function MyReactNativeForm(props) {
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ThemeProvider>
          <Header />
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{ title: "Overview" }}
            />
            <Stack.Screen
              name="details"
              component={DetailsScreen}
              initialParams={{ a: 0 }}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
