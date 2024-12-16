import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MovieCard = ({ movie }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleNavigate = () => {
    navigation.navigate("MovieDetails", { movie });
  };

  return (
    <Card style={styles.card} onPress={handleNavigate}>
      <Card.Cover
        style={{
          flex: 1,
          height: 262.5,
          width: 175,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderRadius: 0,
          resizeMode: "contain",
        }}
        source={{
          uri: `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
        }}
      />
      <Card.Content>
        {movie.title && (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginTop: 5,
                textAlign: "center",
              }}
            >
              {movie.title}
            </Text>
            <Text style={{ textAlign: "center" }}>{movie.release_date}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    borderRadius: 8,
    width: 175,
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
});

export default MovieCard;
