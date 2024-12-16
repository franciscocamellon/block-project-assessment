import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import {
  Card,
  Headline,
  Paragraph,
  Subheading,
  Text,
} from "react-native-paper";

const { width, height } = Dimensions.get("window");

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  return (
    <View style={styles.container}>
      <Card style={styles.card} onPress={() => {}}>
        <Card.Cover
          style={styles.image}
          source={{
            uri: `https://media.themoviedb.org/t/p/w220_and_h330_face${
              movie.poster_path || ""
            }`,
          }}
        />
        <Card.Content>
          {movie.title && (
            <View>
              <Headline style={styles.title} variant="titleLarge">
                {movie.title + "\n"}
                <Subheading>
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("pt-BR")
                    : "Data desconhecida"}{" "}
                  (BR) •{" "}
                  {movie.runtime
                    ? `${movie.runtime}min`
                    : "Duração desconhecida"}
                </Subheading>
              </Headline>
              <View style={styles.row}>
                <Paragraph style={styles.ratingText}>
                  {movie.vote_average
                    ? `${movie.vote_average.toFixed(1)}%`
                    : "Sem avaliação"}
                </Paragraph>
                <Text style={styles.ratingText}>Avaliação dos usuários</Text>
              </View>
            </View>
          )}

          <Paragraph style={styles.tagline}>
            {movie.tagline || "Sem tagline disponível"}
          </Paragraph>
          <Subheading>Sinopse</Subheading>

          <Paragraph style={styles.movieDescription}>
            {movie.overview}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
      },
    }),
  },
  image: {
    height: height * 0.6,
    width: "auto",
  },
  title: {
    marginTop: 10,
  },
  tagline: {
    fontStyle: "italic",
    color: "#aaa",
    margin: 10,
  },
  row: {
    fontStyle: "700",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    margin: 5,
    color: "#4caf50",
  },
  ratingText: {
    color: "#4caf50",
  },
});

export default MovieDetailScreen;
