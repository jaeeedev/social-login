import { useEffect } from "react";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
  useEffect(() => {
    const JAVASCRIPT_KEY = "b946ad61377daa245e7f7aa5c76758d0";
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JAVASCRIPT_KEY);
      window.Kakao.isInitialized();
    }
  }, []);
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
