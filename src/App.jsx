import { useState } from "react";
import NewsFeed from "./components/NewsFeed";
import "./App.css";

function App() {
  return (
    <>
      <div className="homeSection">
        <h1>Entertainment News</h1>
        <NewsFeed />
      </div>
    </>
  );
}

export default App;
