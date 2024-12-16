import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { authenticateUserWithLogin } from "../api/tmdbApi";
import { useAppContext } from "../Context";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signIn } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const sessionId = await signIn(username, password, setLoading);
      if (sessionId) {
        navigation.navigate("Tabs", {
          screen: "Movies",
          username: username,
        });
      }
    } catch (error) {
      Alert.alert("Erro de Login", error.message || "Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title} variant="displayLarge">
          CLONEDB
        </Text>
        <Text
          style={{ textAlign: "center", fontWeight: 700 }}
          variant="titleLarge"
        >
          Entrar
        </Text>
        <Text
          style={{ textAlign: "center", flexWrap: "wrap", padding: 15 }}
          variant="bodyLarge"
        >
          Digite suas credenciais do site The Movie Database (TMDB)
        </Text>
      </View>
      <TextInput
        style={styles.input}
        label="Nome de usuário"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        label="Senha"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button
          uppercase="true"
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        >
          Entrar
        </Button>
        {/* <Button
          uppercase="true"
          mode="contained"
          onPress={() =>
            navigation.navigate("Home", {
              screen: "Movies",
            })
          }
          disabled={loading}
        >
          Convidado
        </Button> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  textContainer: {
    height: 200,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 15,
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    marginBottom: 15,
  },
});

export default LoginScreen;
