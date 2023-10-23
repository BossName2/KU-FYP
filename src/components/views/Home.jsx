import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Card, CardContainer } from "../UI/Card";
import api from "../../api/Api";

function Home() {
  //Intitializing
  const endpoint = `/students/moduleLeader`;
  //States
  const [students, setStudents] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState([]);
  //Api
  const apiGetModuleLeaderStudents = async (endpoint) => {
    const response = await api.get(endpoint);
    if (response.isSuccess) {
      setStudents(response.result);
    } else setLoadingMessage("No students found");
  };

  useEffect(() => {
    apiGetModuleLeaderStudents;
  }, []);
  //Handlers

  //View
  return (
    <>
      <h1>Modules</h1>

      {!students ? (
        <p>{loadingMessage}</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <CardContainer>
          {students.map((student) => (
            <Card>
              <p1>student.id</p1>
            </Card>
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default Home;
