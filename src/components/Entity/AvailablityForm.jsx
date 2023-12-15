import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GridForm from "../UI/GridForm";
import apiUrl from "../../api/apiUrl.jsx";

const initialAvaliblity = {
  userID: `0`,
  TimeslotID: `0`,
};

function AvailablityForm({ onCancel, onSuccess }) {
  // Initialisation ------------------------------
  const conformance = {
    html2js: {
      userID: (value) => parseInt(value),
      TimeslotID: (value) => parseInt(value),
    },
    js2html: {
      userID: (value) => parseInt(value),
      TimeslotID: (value) => parseInt(value),
    },
  };
  const apiURL = apiUrl;
  const endpoint = `${apiURL}/availability`;

  // State ---------------------------------------
  const [availability, setAvailability] = useState(initialAvaliblity);
  const [timeslotID, setTimeslotID] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [dayID, setDayID] = useState([1, 2, 3, 4, 5]);

  const apiPost = async (endpoint, record) => {
    // Build request object
    const request = {
      method: "POST",
      body: JSON.stringify(record),
      headers: { "Content-type": "application/json" },
    };
  };
  const apiDelete = async (endpoint, record) => {
    // Build request object
    const request = {
      method: "DELETE",
      body: JSON.stringify(record),
      headers: { "Content-type": "application/json" },
    };
  };

  // Call the Fetch
  //   const response = await fetch(endpoint, request);
  //   const result = await response.json();
  //   return response.status >= 200 && response.status < 300
  //     ? { isSuccess: true }
  //     : { isSuccess: false, message: result.message };

  useEffect(() => {}, []);
  // Handlers ------------------------------------

  const handlePost = async (timeID, dayID) => {
    setAvailability({ userID: `0`, TimeslotID: `${timeID}` });
    console.log(`Availability=[${JSON.stringify(availability)}]`);
    const result = await apiPost(endpoint, availability);
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };
  const handleDelete = async (timeID, dayID) => {
    setAvailability({ userID: `0`, TimeslotID: `${timeID}` });
    console.log(`Availability=[${JSON.stringify(availability)}]`);
    const result = await apiDelete(endpoint, availability);
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };

  // View ----------------------------------------
  return (
    <div className="availablityForm">
      <div className="FormTray">
        <GridForm row={timeslotID} column={dayID} />
      </div>
    </div>
  );
}

AvailablityForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default AvailablityForm;
