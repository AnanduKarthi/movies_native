import { useEffect, useState } from "react";

type Props = {};

const useFetch = <T>(fetchFun: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      SetLoading(true);
      setError(null);
      const results = await fetchFun();
      setData(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      SetLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    SetLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, error, loading, refetch: fetchData, reset };
};

export default useFetch;
