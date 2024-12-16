import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Divider, TextInput, useTheme } from "react-native-paper";

import ClonedbAppBar from "../components/appbar";
import MovieCard from "../components/movieCard";
import SearchBar from "../components/searchBar";
import { fetchFromApi } from "../api/tmdbApi";
import MovieCardFull from "../components/movieCardFull";

const mediaTypes = [
  {
    id: 1,
    name: "movie",
    title: "Filmes",
    count: 0,
    items: null,
  },
  {
    id: 2,
    name: "tv",
    title: "Séries",
    count: 0,
    items: null,
  },
  {
    id: 3,
    name: "person",
    title: "Pessoas",
    count: 0,
    items: null,
  },
  {
    id: 4,
    name: "collection",
    title: "Coletâneas",
    count: 0,
    items: null,
  },
  {
    id: 5,
    name: "company",
    title: "Companhias",
    count: 0,
    items: null,
  },
  {
    id: 6,
    name: "keyword",
    title: "Palavras-chave",
    count: 0,
    items: null,
  },
  {
    id: 7,
    name: "network",
    title: "Network",
    count: 0,
    items: null,
  },
];

const SearchResultScreen = ({ route }) => {
  const theme = useTheme();
  const { searchTerm } = route.params;
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  const [media, setMedia] = useState([...mediaTypes]);

  const fetchData = async (query) => {
    try {
      const response = await fetchFromApi(
        `/search/multi?query=${query}&include_adult=false&language=pt-BR&page=1`
      );
      setData(response.results);
      countMedia(response.results);
    } catch (error) {
      console.error("Erro ao realizar o fetch", error);
    }
  };

  function countMedia(mediaList) {
    if (!mediaList) {
      return;
    }
    const updatedMedia = [...mediaTypes];

    for (let key in updatedMedia) {
      if (!updatedMedia[key].items) {
        updatedMedia[key].items = mediaList.filter(
          (item) => item.media_type === updatedMedia[key].name
        );
        updatedMedia[key].count = updatedMedia[key].items.length;
      }

      setMedia(updatedMedia);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      fetchData(searchTerm);
    }
  }, []);

  useEffect(() => {
    countMedia(data);
  }, [data]);
  return (
    <View style={styles.container}>
      <ClonedbAppBar />
      <TextInput
        placeholder="Search"
        mode="outlined"
        right={
          <TextInput.Icon
            icon="cloud-search-outline"
            style={{ marginRight: 30 }}
            onPress={() => fetchData(search)}
          />
        }
        value={search}
        onChangeText={(text) => setSearch(text)}
        contentStyle={{ color: theme.colors.primaryContainer, paddingLeft: 25 }}
        outlineStyle={{
          borderColor: "#dedede",
          borderRadius: 0,
        }}
      />
      <View style={styles.section}>
        <Text style={styles.title}>Resultado da busca</Text>
      </View>
      <View style={styles.menuSection}>
        <FlatList
          data={media}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                gap: 5,
                marginLeft: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {item.title}
              </Text>
              <View
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  width: 35,
                  height: 20,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                  borderColor: theme.colors.onPrimaryContainer,
                  borderWidth: 1,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: 500 }}>
                  {item.count}
                </Text>
              </View>
            </View>
          )}
          horizontal
        />
      </View>
      <Divider></Divider>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MovieCardFull movie={item}></MovieCardFull>
          )}
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
    padding: 20,
    backgroundColor: "#019dda",
  },
  menuSection: {
    padding: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
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
  input: {
    borderColor: "#fff",
  },
});

export default SearchResultScreen;
