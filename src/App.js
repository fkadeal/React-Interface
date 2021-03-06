import { useCallback ,useState ,useEffect } from "react";
import {BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
// import AppointmentList from "./data.json";
import AppointmentListInfro from "./components/AppointmentListInfo";

  function App({onsortBy}) {
    let [AppointmentList , setAppointmentList] = useState([]);
    let [query ,setQuery] = useState("");
    let [sortBy, setsortBy] = useState("petName");
    let [orderBy, setorderBy] = useState("asc");
    const filterdAppointments = AppointmentList.filter(
      item => {
      return(
          item.petName.toLowerCase().includes(query.toLowerCase()) ||
          item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
          item.aptNotes.toLowerCase().includes(query.toLowerCase()) 
        );
    }).sort((a,b) => {
      let order = (orderBy === 'asc') ? 1 : -1;
      return (
        a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? -1 * order : 1 * order
      )
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
       <AddAppointment onSendAppointment={newAppointment => setAppointmentList([...AppointmentList, newAppointment])} 
       lastId={AppointmentList.reduce((max,item) => Number(item.id) > max ? Number(item.id) : max, 0)}/>
       <Search query={query}
       onChangeQuery={myQuery => {
         setQuery(myQuery)
       }}

       orderBy={orderBy}
        onOrderByChange={mySort => setorderBy(mySort)}
       sortBy={sortBy}
       sortByChange={mySort => setsortBy(mySort)}
       />
       <ul className="divide-y divide-gray-200">
                {
                  filterdAppointments.map(appointment =>(
                  <AppointmentListInfro 
                    key={appointment.id} 
                    appointment={appointment}
                    onDeleteAppointment={
                      appointmentID => setAppointmentList(AppointmentList.filter(apointment => apointment.id !== appointmentID)) }
                     />
                     )
                     )
                }
       </ul>
    </div>
  );
}

export default App;
