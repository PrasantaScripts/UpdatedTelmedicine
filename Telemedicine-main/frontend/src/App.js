import { Route } from "react-router-dom";
import Home from "./pages/Home";
import "./app.css";
import Admin from "./pages/Admin";
import healthWorker from "./pages/HealthWorker";
import Protect from "./components/Protect";
import Doctor from "./pages/Doctor";
import FamilyCardsView from "./pages/FamilyCardsView";
import Conference from "./pages/Conference";
import Prescription from "./pages/Prescription";
import HwRegister from "./components/HwRegister";
import DoctorRegister from "./components/DoctorRegister";
import SearchFamilyCards from "./components/SearchFamilyCards";
import SearchHW from "./components/SearchHW";
import SearchDoctor from "./components/SearchDoctor";
import PatientInformation from "./components/PatientInformation";
import ConferenceHw from "./pages/Conference_HW";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
      <Protect>
        <Route path="/HealthWorker" component={healthWorker} exact />
        <Route path="/admin" component={Admin} exact />
        <Route path="/doctor" component={Doctor} exact />
        <Route path="/info" component={FamilyCardsView} exact />
        <Route path="/conference/:id" component={Conference} exact />
        <Route path="/conferenceHw" component={ConferenceHw} exact />
        <Route path='/prescription/:id' component={Prescription} exact />
        {/* <Route path='/HealthWorker/registration' component={HwRegister} exact/> */}
        <Route path="/Doctor/registration" component={DoctorRegister} exact />
        <Route path="/Doctor/search" component={SearchDoctor} exact />
        {/* <Route path='/Patient/search' component={PatientInformation} exact/> */}
      </Protect>
    </div>
  );
}

export default App;
