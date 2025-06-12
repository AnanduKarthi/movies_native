import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/Services/api";
import { getTrendingMovie } from "@/Services/appWrite";
import useFetch from "@/Services/useFetch";
import { useRouter } from "expo-router";

import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovie,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovie);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className=" w-full absolute z-0" />
      <ScrollView
        className=" flex-1 px5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10"
          />
        ) : moviesError || trendingError ? (
          <Text>Error:{moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeHolder="Search for a movie"
            />
            <View className="mt-10">
              <Text className=" text-lg text-white font-bold mb-3">
                Trending Movies
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                data={trendingMovie}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />
            </View>
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
