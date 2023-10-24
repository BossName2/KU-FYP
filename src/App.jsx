import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/views/Home.jsx";

function App() {
  const loggedInUser = "3";

  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
