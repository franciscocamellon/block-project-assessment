import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  Card,
  Headline,
  Paragraph,
  Subheading,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MovieCardFull = ({ movie }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("MovieDetails", { movie });
  };

  return (
    <Card style={styles.card} onPress={handleNavigate}>
      <Card.Cover
        source={{
          uri: `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
        }}
      />
      <Card.Content>
        {movie.title && (
          <View>
            <Headline variant="titleLarge">
              {movie.title + " "}
              <Subheading>({movie.original_title})</Subheading>
            </Headline>
            <Paragraph>{movie.release_date}</Paragraph>
          </View>
        )}
        <Paragraph style={styles.movieDescription}>{movie.overview}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    margin: 10,
    borderRadius: 8,
    // width: 150,
    gap: 30,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
      },
    }),
  },
  movieDescription: {
    marginTop: 10,
  },
});

export default MovieCardFull;
