import { Platform, StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PersonalListCard = ({ personalList }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleNavigate = () => {
    navigation.navigate("MovieDetails", { personalList });
  };

  return (
    <Card style={styles.card} onPress={handleNavigate}>
      {personalList.items.length > 0 ? (
        <Card.Cover
          style={styles.cardCover}
          source={{
            uri: `https://media.themoviedb.org/t/p/w220_and_h330_face${personalList.items[0].poster_path}`,
          }}
        ></Card.Cover>
      ) : (
        <Card.Cover
          style={styles.cardCover}
          source={{
            uri: "https://picsum.photos/700",
          }}
        />
      )}

      <Card.Content>
        {personalList.name && (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{personalList.name}</Text>
            <Text style={{ textAlign: "center" }}>
              {personalList.item_count} item
              {personalList.item_count > 1 ? "s" : ""}
            </Text>
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
  cardCover: {
    flex: 1,
    height: 262.5,
    width: 175,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderRadius: 0,
    resizeMode: "contain",
  },
  center: {},
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 5,
    textAlign: "center",
  },
});

export default PersonalListCard;
