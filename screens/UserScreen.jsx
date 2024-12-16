import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import {
  Text,
  Avatar,
  IconButton,
  useTheme,
  Divider,
  Button,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ClonedbAppBar from "../components/appbar";
import PersonalListCard from "../components/personalList";
import { useAppContext } from "../Context";

const { width, height } = Dimensions.get("window");

const UserScreen = () => {
  const navigation = useNavigation();
  const { user } = useAppContext();
  const theme = useTheme();

  const handleCamera = () => {
    navigation.navigate("Camera");
  };

  return (
    <>
      <ClonedbAppBar />
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBorder}>
            <Avatar.Image
              size={120}
              source={{
                uri: `https://media.themoviedb.org/t/p/w150_and_h150_face${user.avatar}`,
              }}
            />
          </View>
          <IconButton
            style={styles.icon}
            mode={"contained"}
            icon="camera"
            iconColor={"black"}
            size={20}
            onPress={() => handleCamera()}
          />
          <Text style={styles.title}>{user.name}</Text>
        </View>
        <Text
          style={{
            width: "100%",
            padding: 10,
            textAlign: "left",
          }}
          variant="titleLarge"
        >
          Listas
        </Text>

        <Divider bold style={{ width: "100%" }}></Divider>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 20,
            padding: 10,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 700,
              textAlign: "left",
              paddingRight: 10,
            }}
            variant="titleSmall"
          >
            Minhas Listas
          </Text>
          <View style={{ flexShrink: 1 }}>
            <Button
              mode="contained"
              background={theme.colors.tertiary}
              buttonColor={theme.colors.tertiary}
              onPress={() => {}}
              style={{ width: 120, alignSelf: "flex-end" }}
            >
              Criar Lista
            </Button>
          </View>
        </View>
        <View>
          <FlatList
            data={user.personalLists}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <PersonalListCard personalList={item}></PersonalListCard>
            )}
            columnWrapperStyle={{ gap: 30, marginBottom: 15, marginTop: 15 }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  avatarContainer: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 15,
    backgroundColor: "#062d45",
  },
  avatarBorder: {
    borderRadius: 60,
    borderColor: "#21d5a9",
    borderWidth: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: "left",
    flexWrap: "wrap",
    maxWidth: width * 0.6,
    color: "#fff",
  },
  icon: {
    position: "absolute",
    top: 130,
    left: width / 2 - 130,
  },
});

export default UserScreen;
