import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import FoodListScreen from "./src/screens/FoodListScreen";
import useStore from "./src/store";

export default function App() {
  const refreshAll = useStore((s) => s.refreshAll);
  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <ThemeProvider>
      <FoodListScreen />
    </ThemeProvider>
  );
}
