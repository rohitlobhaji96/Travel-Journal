import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "./journal.css";

export default function AddJournal({setDataUpdated}) {

    const [journal, setJournal] = useState({
         title: "",
          country: "",
           from_date: "",
            to_date: "",
            map_link:"", 
            text: "" });

            const [alertMessage, setAlertMessage] = useState(null); 
            const [alertType, setAlertType] = useState("success"); 
            const navigate = useNavigate();
            const handleChange = (e) => {
                const { name, value } = e.target;
            
                // Ensure correct format for date fields
                if (name === "from_date" || name === "to_date") {
                    setJournal({ ...journal, [name]: value });
                } else {
                    setJournal({ ...journal, [name]: value });
                }
            };

            const handleSubmit = async (e) => {
              e.preventDefault();
              try {
                const formattedForm = {
                  title: journal.title,
                  country: journal.country,
                  map_link: journal.map_link,
                  text: journal.text,
                  from_date: journal.from_date,
                  to_date: journal.to_date
                };
            
                const token = localStorage.getItem("token");
            
                await axios.post(`http://localhost:8080/api/journal`, formattedForm, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  }
                });
            
                setDataUpdated(prev => !prev);
                setAlertMessage("Journal added successfully!");
                setAlertType("success");
                setJournal({ title: "", country: "", from_date: "", to_date: "", map_link: "", text: "" });
            
                setTimeout(() => setAlertMessage(null), 1000);
                setTimeout(() => navigate("/journal"), 2000);
              } catch (e) {
                console.log(e);
                setAlertMessage("Failed to add journal. Please try again.");
                setAlertType("danger");
                setTimeout(() => setAlertMessage(null), 1000);
                setTimeout(() => navigate("/journal"), 2000);
              }
            }
            

  return (
    
    <div className="container">
    <Header/>
    {alertMessage && (
      <div className={`alert alert-${alertType} alert-dismissible fade show alert-container`} role="alert">
          {alertMessage}
      </div>
  )}
  <div className='form-container'>
      <form className='form' onSubmit={handleSubmit} >
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={journal.title} onChange={handleChange} required />
          <br />

          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" value={journal.country} onChange={handleChange} required />
          <br />

          <label htmlFor="map_link">Map Link:</label>
          <input type="text" id="map_link" name="map_link" value={journal.map_link} onChange={handleChange} required />
          <br />

          <label htmlFor="from_date">From Date:</label>
          <input type="date" id="from_date" name="from_date" value={journal.from_date} onChange={handleChange} required />
          <br />

          <label htmlFor="to_date">To Date:</label>
          <input type="date" id="to_date" name="to_date" value={journal.to_date} onChange={handleChange} required />
          <br />

          <label htmlFor="text">Description:</label>
          <textarea id="text" name="text" value={journal.text} onChange={handleChange} required></textarea>
          <br />

          <input type="submit" value="Submit" />
      </form>
  </div>
</div>
  )
}
