import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body></Body>}>
            <Route path="/test" element={<div>Test Page</div>} />
            <Route path="/login" element={<div>login</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
