import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

type SearchType = {
  placeHolder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
};

const SearchBar = ({
  onPress,
  placeHolder,
  value,
  onChangeText,
}: SearchType) => {
  return (
    <View className=" flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        className=" size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
        source={icons.search}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-white ml-2"
      />
    </View>
  );
};

export default SearchBar;
