import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { fetchFromApi, authenticateUserWithLogin } from "./api/tmdbApi";
import { PaperProvider, useTheme } from "react-native-paper";
import { lightTheme } from "./theme";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const theme = useTheme();
  const [personalList, setPersonalList] = useState([]);
  const [user, setUser] = useState({
    id: -1,
    avatar: "",
    name: "",
    username: "",
    personalLists: [],
    session: "",
    token: "",
  });

  const signIn = async (username, password, setLoading) => {
    if (!username || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const sessionId = await authenticateUserWithLogin(username, password);
      if (sessionId) {
        console.log(sessionId);
        const updatedUser = { ...user, session: sessionId };
        setUser(updatedUser);
        fetchUser(username);
        fetchLists(username);
        fetchListsDetail(personalList);

        return sessionId;
      }
    } catch (error) {
      Alert.alert("Erro de Login", error.message || "Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (username) => {
    try {
      const data = await fetchFromApi(`/account/${username}`);

      if (data) {
        const currentUser = {
          ...user,
          id: data.id,
          avatar: data.avatar.tmdb.avatar_path,
          name: data.name,
          username: data.username,
        };
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Erro ao realizar o fetch", error);
    }
  };

  const fetchLists = async (username) => {
    try {
      const response = await fetchFromApi(`/account/${username}/lists`);
      const result = response.results;
      const currentLists = [];

      if (result && result.length > 0) {
        result.map((item) => {
          currentLists.push(item.id);
        });
        setPersonalList(currentLists);
      }
    } catch (error) {
      console.error("Erro ao realizar o fetch", error);
    }
  };

  const fetchListsDetail = async (personalList) => {
    try {
      let currentPersonalLists = [];
      for (const listId of personalList) {
        const response = await fetchFromApi(`/list/${listId}`);
        if (response) {
          currentPersonalLists.push(response);
        }
      }
      setUser({ ...user, personalLists: currentPersonalLists });
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
    }
  };

  const sharedState = { signIn, user, theme };

  useEffect(() => {
    fetchListsDetail(personalList);
  }, [user.username]);

  return (
    <AppContext.Provider value={sharedState}>
      <PaperProvider theme={lightTheme}>{children}</PaperProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
