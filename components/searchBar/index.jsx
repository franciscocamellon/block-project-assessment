import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput, useTheme } from "react-native-paper";

const SearchBar = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [text, setText] = useState("");

  return (
    <TextInput
      placeholder="Search"
      mode="outlined"
      right={
        <TextInput.Icon
          icon="cloud-search-outline"
          style={{ marginRight: 30 }}
          onPress={() =>
            navigation.navigate("SearchResult", { searchTerm: text })
          }
        />
      }
      value={text}
      onChangeText={(text) => setText(text)}
      contentStyle={{ color: theme.colors.primaryContainer, paddingLeft: 25 }}
      outlineStyle={{
        borderColor: theme.colors.tertiary,
        borderRadius: 40,
      }}
    />
  );
};

export default SearchBar;
