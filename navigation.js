import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import CameraScreen from "./screens/CameraScreen";
import MovieScreen from "./screens/MovieScreen";
import TvSeriesScreen from "./screens/TvSeriesScreen";
import SearchResultScreen from "./screens/SearchResultScreen";

const TabStack = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      switch (route.name) {
        case "Home":
          return (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          );
        case "Movie":
          return (
            <Ionicons
              name={focused ? "film" : "film-outline"}
              size={size}
              color={color}
            />
          );
        case "Series":
          return (
            <Ionicons
              name={focused ? "tv" : "tv-outline"}
              size={size}
              color={color}
            />
          );
        case "Profile":
          return (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          );
        default:
          return (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          );
      }
    },
    headerShown: false,
    tabBarActiveTintColor: "#032541",
    tabBarInactiveTintColor: "#01b4e4",
  }),
  screens: {
    Home: HomeScreen,
    Movie: MovieScreen,
    Series: TvSeriesScreen,
    Profile: UserScreen,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
    Tabs: {
      screen: TabStack,
      options: { headerShown: false },
    },
    SearchResult: {
      screen: SearchResultScreen,
      options: {
        headerShown: false,
        title: "Resultado da Busca",
      },
    },
    MovieDetails: {
      screen: MovieDetailScreen,
      options: {
        headerShown: true,
        title: "Detalhes",
      },
    },
    Camera: {
      screen: CameraScreen,
      options: {
        title: "Câmera",
      },
    },
  },
});

export default RootStack;
