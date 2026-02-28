/* Package imports */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Component imports */
import Layout from "@/components/Layout";
import Home from "@/pages/home/Home";

/* Style imports */
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/dashboard" element={<Home />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
