import { useCallback ,useState ,useEffect } from "react";
import {BiTrash,   BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
// import AppointmentList from "./data.json";
import AppointmentListInfro from "./components/AppointmentListInfo";

  function App() {
    let [AppointmentList , setAppointmentList] = useState([]);

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
       <Search />
       <ul className="divide-y divide-gray-200">
                {
                  AppointmentList.map(appointment =>(
                  <AppointmentListInfro 
                  key={appointment.id} appointment={appointment} />))
                }
       </ul>
    </div>
  );
}

export default App;
