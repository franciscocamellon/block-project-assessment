import { createStaticNavigation } from "@react-navigation/native";
import RootStack from "./navigation";
import AppProvider from "./Context";

const AppNavigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}
