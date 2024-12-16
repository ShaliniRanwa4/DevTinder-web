import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile"
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Request from "./components/Request";

function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body></Body>}>
          <Route path="/" element={<Feed></Feed>}/>
            <Route path="/profile" element={<Profile></Profile>} />
            <Route path="/login" element={<Login></Login>}/>
            <Route path="/connections" element={<Connections></Connections>}/>
            <Route path="/requests" element={<Request></Request>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
