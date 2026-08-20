import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Entry from "./components/Entry";
import UpdateJournal from "./components/UpdateJournal";
import AddJournal from "./components/AddJournal";
import Login from "./components/login/Login";
import SignUp from "./components/Signup/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [data, setData] = useState([]);
const [dataUpdated, setDataUpdated] = useState(false); // ✅ Tracks updates
const fetchData = async () => {

    try {
      const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/journal",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
useEffect(() => {
    fetchData();
}, [dataUpdated]);  // ✅ Fetch data whenever `dataUpdated` changes

  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        {/* Home Page (Journal Entries) */}
        <Route path="/journal" element={<PrivateRoute><Entry data={data} setDataUpdated={setDataUpdated} /></PrivateRoute>} />
        {/* Update Journal Page */}
        <Route path={`/update`} element={<PrivateRoute><UpdateJournal setDataUpdated={setDataUpdated} /></PrivateRoute>} />
        {/* Add Journal Page */}
        <Route path="/add"  element={<PrivateRoute><AddJournal setDataUpdated={setDataUpdated} /></PrivateRoute>} />
        <Route path="/signup"  element={<SignUp  />} />
      </Routes>
    </Router>
  );
}

export default App;
