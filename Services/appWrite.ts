import { Client, Databases, ID, Query } from "react-native-appwrite";
//track search made by user

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // From Appwrite dashboard

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerms", query),
    ]);

    //check record of the search already stored
    //if a document fount increment the searchCount field
    if (result.documents.length > 0) {
      const exitingMovie = result.documents[0];
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        exitingMovie.$id,
        {
          count: exitingMovie.count + 1,
        }
      );
    } else {
      //if no document fount
      //create a new document in appWrite database -> 1
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerms: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovie = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
