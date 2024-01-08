import "./App.css";
import React, { Suspense, lazy } from "react";

// import SignIn from "./Views/SignIn";
// import Home from "./Views/Home";
import { useAuth } from "./Utiles/hooks";
import Loader from "./Primitives/Loader";
import LocalStorageService from "./Utiles/localStroage";

const SignIn = lazy(() => import("./Views/SignIn"))
const Home = lazy(() => import("./Views/Home"))

function App({ csInterface }) {
  console.log(csInterface);
  const { isUserLoading } = useAuth();

  return (
    <>
      <div className="App">
        {isUserLoading ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader/>}>
            <div>
              {LocalStorageService.get_Id_Token() ? <Home /> : <SignIn />}
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
}

export default App;
