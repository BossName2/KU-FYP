import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GridForm from "../UI/GridForm";
import apiUrl from "../../api/apiUrl.jsx";
import api from "../../api/Api.jsx";

const dayEndpoint = `/days`;
const timeslotEndpoint = `/timeslots`;
const initialAvaliblity = {
  UserID: `0`,
  TimeslotID: `0`,
  DayID: `0`,
};

function AvailablityForm({ onSuccess }) {
  // Initialisation ------------------------------
  const conformance = {
    html2js: {
      userID: (value) => parseInt(value),
      TimeslotID: (value) => parseInt(value),
      DayID: (value) => parseInt(value),
    },
    js2html: {
      userID: (value) => parseInt(value),
      TimeslotID: (value) => parseInt(value),
      DayID: (value) => parseInt(value),
    },
  };
  const apiURL = apiUrl;
  const endpoint = `${apiURL}/availability`;

  // State ---------------------------------------
  const [availability, setAvailability] = useState(initialAvaliblity);
  const [timeslotID, setTimeslotID] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [dayID, setDayID] = useState([]);
  const [days, setDays] = useState([]);

  const apiPost = async (endpoint, record) => {
    // Build request object
    const request = {
      method: "POST",
      body: JSON.stringify(record),
      headers: { "Content-type": "application/json" },
    };
    const response = await fetch(endpoint, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };
  const apiDelete = async (endpoint, record) => {
    // Build request object
    const request = {
      method: "DELETE",
      body: JSON.stringify(record),
      headers: { "Content-type": "application/json" },
    };
    const response = await fetch(endpoint, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  const apiGetDay = async (endpoint) => {
    const response = await api.get(endpoint);
    if (response.isSuccess) {
      setDayID(response.result.map((day) => day.DayID));
      setDays(response.result.map((day) => day.Day));
    } else {
      console.log("No Days found");
    }
    console.log(response.result);
  };
  const apiGetTimeslot = async (endpoint) => {
    const response = await api.get(endpoint);
    if (response.isSuccess) {
      setTimeslotID(response.result.map((timeslot) => timeslot.TimeslotsID));
      setTimeslots(response.result.map((timeslot) => timeslot.TimeStart));
    } else {
      console.log("No timeslot found");
    }
    console.log(response.result);
  };

  // Call the Fetch
  //   const response = await fetch(endpoint, request);
  //   const result = await response.json();
  //   return response.status >= 200 && response.status < 300
  //     ? { isSuccess: true }
  //     : { isSuccess: false, message: result.message };

  useEffect(() => {
    apiGetTimeslot(timeslotEndpoint);
    apiGetDay(dayEndpoint);
  }, []);
  // Handlers ------------------------------------

  const handlePost = async (timeID, dayID) => {
    setAvailability({
      UserID: `1`,
      TimeslotID: `${timeID}`,
      DayID: `${dayID}`,
    });
    console.log(timeID + "," + dayID);
    console.log(`Availability=[${JSON.stringify(availability)}]`);
    const result = await apiPost(endpoint, availability);
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };
  const handleDelete = async (timeID, dayID) => {
    setAvailability({
      UserID: `1`,
      TimeslotID: `${timeID}`,
      DayID: `${dayID}`,
    });
    console.log(timeID + "," + dayID);
    console.log(`Availability=[${JSON.stringify(availability)}]`);
    const result = await apiDelete(endpoint, availability);
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };

  // View ----------------------------------------
  return (
    <div className="availablityForm">
      <div className="FormTray">
        <GridForm
          rowTitle={timeslots}
          columnTitle={days}
          row={timeslotID}
          column={dayID}
          onClickTrue={(timeID, dayID) => handleDelete(timeID, dayID)}
          onClickFalse={(timeID, dayID) => handlePost(timeID, dayID)}
        />
      </div>
    </div>
  );
}

AvailablityForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default AvailablityForm;
