import { View, Text } from "react-native";
import { typography } from "@/styles/typography ";
import { page } from "@/styles/frame";
import Character from "@/components/Buttons/Character";
import AddCharacter from "@/components/Buttons/AddCharacter";
import { useEffect, useState } from "react";
import { getCharacters } from "@/services/characterServices";
import { useLocalSearchParams } from "expo-router";
import { CharacterType } from "@/utils/types";

export default function Characters() {
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  const { id, title } = useLocalSearchParams();
  const fixedId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const res = await getCharacters(fixedId);

        if (!res.ok) {
          console.log("Error: ", res.message);
          return null;
        }

        setCharacters(res.data);
      } catch (error: any) {
        console.log(error);
        return null;
      }
    }

    fetchCharacters();
  }, []);

  return (
    <View style={page.frame}>
      <Text style={typography.h1}>{title} characters</Text>
      <View style={{ gap: 10 }}>
        {characters.map((character) => (
          <Character name={character.name} key={character._id} />
        ))}
        <AddCharacter />
      </View>
    </View>
  );
}
