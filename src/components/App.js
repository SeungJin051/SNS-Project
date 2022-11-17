import AppRouter from "./Router";
import React, { useState, useEffect } from "react";
import { authService } from "../fbase";

function App() {
  useEffect(() => {
    console.log(authService.currentUser);
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
