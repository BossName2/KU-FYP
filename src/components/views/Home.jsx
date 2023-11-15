import { useEffect, useState } from "react";
import "./Home.scss";
import { Card, CardContainer } from "../UI/Card";
import { ImageCard } from "../UI/ImageCard";
import Modal from "../UI/Modal";
import api from "../../api/Api";
import StudentForm from "../Entity/StudentForm";

function Home(props) {
  //Intitializing
  const endpoint = `/students/moduleLeader/${props.loggedInUser}`;
  //States
  const [students, setStudents] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState([]);
  const [showSrudentForm, setShowSrudentForm] = useState(false);
  //Api
  const apiGetModuleLeaderStudents = async (endpoint) => {
    const response = await api.get(endpoint);
    response.isSuccess
      ? setStudents(response.result)
      : setLoadingMessage("No students found");
    console.log(response.result);
    console.log(response.result[0].Email);
  };

  useEffect(() => {
    apiGetModuleLeaderStudents(endpoint);
  }, []);

  //Handlers

  //View
  return (
    <>
      <div className="top">
        <h1>Students</h1>
        <div className="formDisplay">
          <button onClick={() => setShowSrudentForm(!showSrudentForm)}>
            Add Student
          </button>
        </div>
        <Modal
          show={showSrudentForm}
          handleClose={() => setShowSrudentForm(false)}
        >
          <div className="form">
            <StudentForm onSuccess={() => setShowSrudentForm(false)} />
          </div>
        </Modal>
      </div>
      {!students ? (
        <p>{loadingMessage}</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <>
          <CardContainer>
            {/* {students.map((student) => (
            <ImageCard
              key={student.UserID}
              title={`${student.FirstName} ${student.LastName}`}
              subtitle={"string"}
              imgUrl={student.UserImageURL}
            />
          ))} */}
            {students.map((student) => {
              return (
                <div className="studentCard">
                  <Card>
                    <p>{student.Email.substring(0, 8)}</p>
                    <p>{`${student.FirstName} ${student.LastName}`}</p>
                    <img
                      src={student.UserImageURL}
                      alt={student.Email.substring(0, 8)}
                    />
                  </Card>
                </div>
              );
            })}
          </CardContainer>
        </>
      )}
    </>
  );
}

export default Home;
