import { useCallback ,useState ,useEffect } from "react";
import {BiTrash,   BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
// import AppointmentList from "./data.json";
import AppointmentListInfro from "./components/AppointmentListInfo";

  function App() {
    let [AppointmentList , setAppointmentList] = useState([]);
    let [query ,setQuery] = useState("");
    const filterdAppointments = AppointmentList.filter(
      item => {
      return(
          item.petName.toLowerCase().includes(query.toLowerCase()) ||
          item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
          item.aptNotes.toLowerCase().includes(query.toLowerCase()) 
        );
    })
    const fetchData = useCallback(() =>{
      fetch('./data.json').then(response => response.json()).then(data => {setAppointmentList(data)})
    },[])

    useEffect(()=>{
      fetchData()
    },[fetchData])
  return (
    <div className="App container mx-auto mt-3 font-thin">
     <h1 className="text-5xl mb-5">

       <BiArchive className="inline-block text-red-400"/>your first Appointment</h1>
       <AddAppointment />
       <Search query={query}
       onChangeQuery={myQuery => {
         setQuery(myQuery)
       }}
       />
       <ul className="divide-y divide-gray-200">
                {
                  filterdAppointments.map(appointment =>(
                  <AppointmentListInfro 
                    key={appointment.id} 
                    appointment={appointment}
                    onDeleteAppointment={
                      appointmentID => setAppointmentList(AppointmentList.filter(apointment => apointment.id != appointmentID)) }
                     />
                     )
                     )
                }
       </ul>
    </div>
  );
}

export default App;
