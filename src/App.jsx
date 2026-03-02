//* Package imports */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//* Component imports */
import Home from "@/pages/home/Home";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/dashboard/Dashboard";

//* Style imports */
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
