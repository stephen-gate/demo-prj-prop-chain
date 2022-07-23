import { useState } from "react";
import classes from "./AppPropChain.module.css";
import AppointmentChart from "./components/Chart/AppointmentChart";
import AppointmentDetails from "./components/Details/AppointmentDetails";
import AddNewButton from "./components/AddNewAppointment/AddNewButton";
import AddNewForm from "./components/AddNewAppointment/AddNewForm";
import EditForm from "./components/EditAppointment/EditForm";

// prettier-ignore
const INIT_APPOINTMENT_DATA = [
  { id: 0, label: "08:00", name: "Patrick A. Smith", phone: "(301) 432-7111", completed: false },
  { id: 1, label: "09:00", name: "Patrick B. Smith", phone: "(302) 432-7222", completed: false },
  { id: 2, label: "10:00", name: "Eric Cantona", phone: "(303) 434-7333", completed: false },
  { id: 3, label: "10:00", name: "Patrick C. Smith", phone: "(303) 432-7333", completed: false },
  { id: 4, label: "11:00", name: "Patrick D. Smith", phone: "(304) 432-7444", completed: false },
  { id: 5, label: "12:00", name: "Patrick E. Smith", phone: "(305) 432-7555", completed: false },
  { id: 6, label: "13:00", name: "Patrick F. Smith", phone: "(306) 432-7666", completed: false },
  { id: 7, label: "14:00", name: "Joe Gelhardt", phone: "(307) 432-7777", completed: false },
  { id: 8, label: "15:00", name: "Kalvin Phillips", phone: "(308) 432-7888", completed: false },
  { id: 9, label: "16:00", name: "Patrick G. Smith", phone: "(309) 432-7999", completed: false },
  { id: 10, label: "17:00", name: "Patrick H. Smith", phone: "(444) 432-7891", completed: false },
  { id: 11, label: "18:00", name: "Patrick J. Smith", phone: "(555) 432-7891", completed: false },
  { id: 12, label: "18:00", name: "JJ A. Smith", phone: "(555) 432-7777", completed: false },
  { id: 13, label: "18:00", name: "GG A. Smith", phone: "(555) 432-7888", completed: false },
  { id: 14, label: "18:00", name: "PP A. Smith", phone: "(555) 432-9999", completed: false },
];

export const AppPropChain = () => {
  const [appointmentData, setAppointmentData] = useState(INIT_APPOINTMENT_DATA);
  const [nextAvailableId, setNextAvailableId] = useState(
    INIT_APPOINTMENT_DATA.length
  );

  const [selectedTimeslot, setSelectedTimeslot] = useState("08:00");
  const [fallbackTimeslot, setFallbackTimeslot] = useState("08:00");
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [fallbackDetails, setFallbackDetails] = useState(false);
  const [editRequestId, setEditRequestId] = useState("");

  const handleClickAddNew = () => {
    setShowAddNewForm(true);
    setFallbackDetails(showDetailsForm);
    setShowDetailsForm(false);
    setFallbackTimeslot(selectedTimeslot);
  };

  const handleHideDetails = () => {
    setShowDetailsForm(false);
  };

  const handleClickCancel = () => {
    setShowAddNewForm(false);
    setShowDetailsForm(fallbackDetails);
    setSelectedTimeslot(fallbackTimeslot);
  };

  const handleTimeslotUpdate = (newTime) => {
    setSelectedTimeslot(newTime);
  };

  const handleAddNewData = (newData) => {
    const newAppointment = {
      id: nextAvailableId,
      label: newData.label,
      name: newData.name ? newData.name : "no name entered.",
      phone: newData.phone ? newData.phone : "no phone entered.",
      completed: false,
    };

    setAppointmentData((prevAppointment) => {
      return [...prevAppointment, newAppointment];
    });

    setNextAvailableId((prevId) => {
      return prevId + 1;
    });

    setShowAddNewForm(false);
    setSelectedTimeslot(newData.label);
    setShowDetailsForm(fallbackDetails);
  };

  const handleSelectTime = (barSelectTime) => {
    setShowAddNewForm(false);
    setSelectedTimeslot(barSelectTime);
    setShowDetailsForm(true);
  };

  const handleRequestToEdit = (editId) => {
    setEditRequestId(editId);
  };

  const handleEditCancel = () => {
    setEditRequestId("");
  };

  const handleEditUpdate = (updatedAppointment) => {

    setAppointmentData((prevAppData) => {
      const updatedAppData = [...prevAppData];
      for (const appointment in updatedAppData) {
        if (updatedAppData[appointment].id === editRequestId) {
          updatedAppData[appointment] = {
            ...prevAppData[appointment],
            name: updatedAppointment.name
              ? updatedAppointment.name
              : "no name entered.",
            phone: updatedAppointment.phone
              ? updatedAppointment.phone
              : "no phone entered.",
            label: updatedAppointment.label,
          };
        }
      }
      return updatedAppData;
    });
    setEditRequestId("");
  };

  const handleDetailDelete = (deleteId) => {
    
    setAppointmentData((prevAppData) => {
      const updatedAppData = [...prevAppData];
      for (const appointment in updatedAppData) {
        if (updatedAppData[appointment].id === deleteId) {
          updatedAppData[appointment] = {
            ...prevAppData[appointment],
            completed: true,
          };
        }
      }
      return updatedAppData;
    });
  };

  const detailedAppointments = appointmentData.filter((appointment) => {
    return appointment.label === selectedTimeslot && !appointment.completed;
  });

  const incompleteAppointments = appointmentData.filter((appointment) => {
    return !appointment.completed;
  });
 
  const editRequestAppointments = appointmentData.filter((appointment) => {
    return appointment.id === editRequestId;
  });

  const showEditForm = editRequestAppointments.length !== 0;

  return (
    <div className={classes.div_static_plate}>
      
      <AppointmentChart
        appointments={incompleteAppointments}
        onSelectTime={handleSelectTime}
      />

      {showEditForm && (
        <EditForm
          appointments={editRequestAppointments}
          onEditUpdate={handleEditUpdate}
          onEditCancel={handleEditCancel}
        />
      )}

      {!showAddNewForm && !showEditForm && (
        <AddNewButton onAddNewClick={handleClickAddNew} />
      )}

      {showAddNewForm && !showEditForm && (
        <AddNewForm
          selectedTimeslot={selectedTimeslot}
          onAddNewData={handleAddNewData}
          onClickCancel={handleClickCancel}
          onTimeslotUpdate={handleTimeslotUpdate}
        />
      )}

      {showDetailsForm && !showEditForm && (
        <AppointmentDetails
          appointments={detailedAppointments}
          onDetailDelete={handleDetailDelete}
          onDetailUpdate={handleRequestToEdit}
          onHideDetails={handleHideDetails}
        />
      )}
    </div>
  );
};

export default AppPropChain;
