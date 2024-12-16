import { View, Text, FlatList, StyleSheet } from "react-native";
import ClonedbAppBar from "../components/appbar";
import MediaList from "../components/list";
import { useState } from "react";
import MovieCard from "../components/movieCard";

const media = {
  "Airing Today": "airing_today",
  "On The Air": "on_the_air",
  Popular: "popular",
  "Top Rated": "top_rated",
};

const TvSeriesScreen = () => {
  const [series, setSeries] = useState([]);
  return (
    <View style={styles.container}>
      <ClonedbAppBar />
      <View style={styles.section}>
        <Text style={styles.title}>Series populares</Text>
        <MediaList mediaType={"tv"} lists={media} setMedia={setSeries} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={series}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
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
  input: {
    borderColor: "#fff",
  },
});

export default TvSeriesScreen;
