import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

interface Product {
  id: string;
  images: string[];
}

async function fetchPage({ pageParam }: { pageParam?: number }) {
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${
      pageParam || 0
    }&limit=${3}`
  );
  const data = await response.json();
  return {
    data: [...data],
    prevOffset: pageParam,
  };
}

const InfiniteScroll = () => {
  const observer = useRef<IntersectionObserver | null>();
  const rootNode = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const tempLastEleRef = useRef<HTMLDivElement | null>(null);

  console.log(isAtBottom, "isAtBottom");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetched, isFetching } =
    useInfiniteQuery({
      queryKey: ["products/infinite scroll"],
      queryFn: fetchPage,
      getNextPageParam: (lastPage) => {
        // todo if no more page then return false getting hash next page
        return lastPage.prevOffset + 1;
      },
    });

  const products = data?.pages.reduce((acc, p) => {
    return [...acc, ...p.data];
  }, []);

  // console.log(products, "product");

  const lastProduct = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (!node) return;
      if (!isAtBottom) return;
      console.log(node, "node");
      // console.log(rootNode.current, "rootNode");
      // if (rootNode.current === null) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          console.log(entries, "entries");
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          root: rootNode.current,
        }
      );
      observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading, isAtBottom]
  );

  // console.log(rootNode, "rootNode");

  useEffect(() => {
    setTimeout(() => {
      if (tempLastEleRef.current) {
        console.log("working or not");
        tempLastEleRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
      setIsAtBottom(true);
    }, 5000);
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isFetching && <div>Fetching...</div>}
      <main>
        {Array.isArray(products) && (
          <>
            <h1 style={{ textAlign: "center" }}>{products?.length || 0}</h1>
            <div
              // onScroll={() => {
              //   console.log("hello");
              // }}
              ref={rootNode}
              className="product-container"
            >
              {products &&
                products.map((product, index) => (
                  <div
                    key={index}
                    className="element"
                    name={index.toString()}
                    ref={index === 0 ? lastProduct : undefined}
                  >
                    <img
                      width={300}
                      height={300}
                      src={product.images[0]}
                      alt={product.id}
                    />
                    {index === products.length - 1 && (
                      <div ref={tempLastEleRef} />
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
      </main>

      <button onClick={() => fetchNextPage()}>Testing</button>
    </div>
  );
};

export default InfiniteScroll;
