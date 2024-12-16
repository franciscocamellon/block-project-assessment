import { useEffect, useState } from "react";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { View, StatusBar, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../Context";

const ClonedbAppBar = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAppContext();
  return (
    <View style={{ ...styles.appBar, backgroundColor: theme.colors.primary }}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <IconButton
        style={{ ...styles.icon, backgroundColor: null }}
        mode={"contained"}
        icon="menu"
        iconColor={"white"}
        size={24}
      />
      <Text
        style={{
          color: theme.colors.onPrimary,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        CLONEDB
      </Text>
      <Pressable
        style={{
          borderWidth: 2,
          borderColor: theme.colors.secondary,
          borderRadius: 36,
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Avatar.Image
          size={36}
          source={{
            uri: `https://media.themoviedb.org/t/p/w150_and_h150_face${user.avatar}`,
          }}
        />
      </Pressable>
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
  input: {
    borderColor: "#fff",
  },
});

export default ClonedbAppBar;
