import React from "react";
import { useAuth } from "../hooks/useAuth";

const HomePage: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <div>
      <p>HomePage</p>
      <button onClick={signOut}>click</button>
    </div>
  );
};

export default HomePage;
