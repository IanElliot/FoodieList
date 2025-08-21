import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import useStore from "./src/store";

export default function App() {
  const refreshAll = useStore((s) => s.refreshAll);
  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <HomeScreen />
    </SafeAreaView>
  );
}
