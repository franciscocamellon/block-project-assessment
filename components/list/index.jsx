import { List } from "react-native-paper";
import { fetchFromApi } from "../../api/tmdbApi";
import { useState } from "react";

const MediaList = ({ mediaType, lists, setMedia }) => {
  const [expanded, setExpanded] = useState(false);
  const [item, setItem] = useState("");

  const handlePress = () => setExpanded(!expanded);

  const handleFetchFromApi = async (endpoint) => {
    try {
      const response = await fetchFromApi(endpoint);
      setMedia(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePressItem = (text) => {
    console.log(text);
    handleFetchFromApi(`/${mediaType}/${text}`);
    handlePress();
  };

  return (
    <List.Section>
      <List.Accordion
        title={item ? item : "Ordenar"}
        expanded={expanded}
        onPress={handlePress}
      >
        {Object.entries(lists).map(([key, value]) => (
          <List.Item
            key={key}
            title={key}
            onPress={() => (handlePressItem(value), setItem(key))}
          />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

export default MediaList;
