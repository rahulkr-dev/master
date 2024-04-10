import { useEffect, useState } from "react";

interface DataFetcherProps {
  render: (data: number[], loading: boolean) => React.ReactNode;
}

function DataFetcher({ render }: DataFetcherProps) {
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("Data Fetcher rendering", Date.now());

  useEffect(() => {
    async function getData(num: number) {
      setLoading(true);
      setTimeout(() => {
        setData([
          ...Array(num)
            .fill(0)
            .map((_, i) => i + 1),
        ]);
        setLoading(false);
      }, 1000);
    }

    getData(20);
  }, []);

  return <>{render(data, loading)}</>;
}

export const RenderPropPattern = () => {
  console.log("App render...", Date.now());
  return (
    <DataFetcher
      render={(data, loading) => {
        return (
          <div>
            {loading && <p>Loading...</p>}
            {data.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        );
      }}
    />
  );
};
