import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import InfiniteScroll from "./InfiniteScroll";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactInfinwithRISC from "./reactISC";
const queyrClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queyrClient}>
      <InfiniteScroll />
      {/* <ReactInfinwithRISC /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
