import { useEffect, useState } from "react";

interface FetchDataResult<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

export const useFetchData = <T>(url: string): FetchDataResult<T> => {
  const [fetchResult, setFetchResult] = useState<FetchDataResult<T>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchResult({ ...fetchResult, loading: true });
        const response = await fetch(url);
        const data: T = await response.json();
        setFetchResult({ data, loading: false, error: null });
      } catch (error) {
        const errorMsg = (error instanceof Error) ? error.message : "Something went wrong";
        setFetchResult({ ...fetchResult, loading: false, data: null, error: errorMsg });
      }
    };

    fetchData();
  }, [url]);

  return fetchResult;
};
