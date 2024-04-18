import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const getUsers = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${
      pageParam || 0
    }&limit=${10}`
  );
  const data = await res.json();
  return { data, prevOffset: pageParam };
};

const ReactInfinwithRISC = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    getNextPageParam: (lastPage) => {
      // if (lastPage.prevOffset + 10 > lastPage.articleCount) {
      //   return false;
      // }
      // console.log(lastPage, "lastPage");

      return lastPage.prevOffset + 1;
    },
  });

  const product = data?.pages.reduce((acc, p) => {
    return [...acc, ...p.data];
  }, []);

  console.log(product, "product");

  return (
    <div>
      <h1>Hello monsterlessons</h1>
      <button onClick={() => fetchNextPage()}>Click Me</button>

      <InfiniteScroll
        dataLength={product ? product.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<div>Loading...</div>}
      >
        <div>
          {product &&
            product.map((product, index) => (
              <div key={index} className="element">
                <img
                  width={500}
                  height={500}
                  src={product.images[0]}
                  alt={product.id}
                />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ReactInfinwithRISC;
