import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Action from "../UI/Action.jsx";
import apiUrl from "../../api/apiUrl.jsx";
import "./StudentForm.scss";

const initialStudent = {
  userID: `0`,
  firstName: `Dave`,
  lastName: `Defult`,
  email: `studentemail@defult.com`,
  userTypeID: `1`,
  userImageURL:
    "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
};

function StudentForm({ onCancel, onSuccess }) {
  // Initialisation ------------------------------
  const conformance = {
    html2js: {
      userID: (value) => parseInt(value),
      firstName: (value) => (value === "" ? null : value),
      lastName: (value) => (value === "" ? null : value),
      email: (value) => (value === "" ? null : value),
      userTypeID: (value) => (value == 0 ? null : parseInt(value)),
      userImageURL: (value) => (value === "" ? null : value),
    },
    js2html: {
      userID: (value) => parseInt(value),
      firstName: (value) => (value === "" ? null : value),
      lastName: (value) => (value === "" ? null : value),
      email: (value) => (value === "" ? null : value),
      userTypeID: (value) => (value == 0 ? null : parseInt(value)),
      userImageURL: (value) => (value === "" ? null : value),
    },
  };
  const apiURL = apiUrl;
  const endpoint = `${apiURL}/students`;

  // State ---------------------------------------
  const [students, setStudents] = useState(initialStudent);

  const apiPost = async (endpoint, record) => {
    // Build request object
    const request = {
      method: "POST",
      body: JSON.stringify(record),
      headers: { "Content-type": "application/json" },
    };

    // Call the Fetch
    const response = await fetch(endpoint, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  useEffect(() => {}, []);
  // Handlers ------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudents({ ...students, [name]: conformance.html2js[name](value) });
  };

  const handleSubmit = async () => {
    console.log(`Students=[${JSON.stringify(students)}]`);
    const result = await apiPost(endpoint, students);
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };

  // View ----------------------------------------
  return (
    <div className="studentForm">
      <div className="FormTray">
        <row>
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              value={conformance.js2html["firstName"](students.firstName)}
              onChange={handleChange}
            />
          </label>
        </row>
        <row>
          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              value={conformance.js2html["lastName"](students.lastName)}
              onChange={handleChange}
            />
          </label>
        </row>
        <row>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={conformance.js2html["email"](students.email)}
              onChange={handleChange}
            />
          </label>
        </row>
      </div>
      <div className="FormSubmit">
        <Action.Tray>
          <Action.Submit showText onClick={handleSubmit} />
        </Action.Tray>
      </div>
    </div>
  );
}

StudentForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default StudentForm;
