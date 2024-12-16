import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  ActivityIndicator,
  Headline,
  Subheading,
  useTheme,
} from "react-native-paper";
import { fetchFromApi } from "../api/tmdbApi";
import MovieCard from "../components/movieCard";
import ClonedbAppBar from "../components/appbar";
import SearchBar from "../components/searchBar";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    try {
      const data = await fetchFromApi("/movie/popular?language=pt-BR&page=1");
      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <ClonedbAppBar />
      <View style={styles.section}>
        <ImageBackground
          source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
          resizeMode="cover"
        />
        <Headline style={styles.title}>Bem vindo!</Headline>
        <Subheading style={styles.subtitle}>
          Milhões de filmes e séries para você descobrir. Comece a explorar já!
        </Subheading>

        <SearchBar borderColor={theme.colors.tertiary} borderRadius={40} />
      </View>

      <Headline style={styles.listTitle}>Tendências</Headline>
      <View style={styles.listContainer}>
        <FlatList
          data={movies.results}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <MovieCard movie={item}></MovieCard>}
          columnWrapperStyle={{ gap: 30, marginBottom: 15, marginTop: 15 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 0,
    height: 60,
  },
  section: {
    backgroundColor: "#019dda",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
    marginBottom: 8,
  },
  listTitle: {
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    textAlign: "left",
    color: "#fff",
    marginBottom: 12,
  },
  loading: {
    position: "absolute",
    flex: 1,
    top: height / 2,
    left: width / 2,
  },
});

export default HomeScreen;
