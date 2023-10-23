import { useEffect, useState } from "react";
import "./Home.scss";
import { CardContainer } from "../UI/Card";
import { ImageCard } from "../UI/ImageCard";
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
    response.isSuccess
      ? setStudents(response.result)
      : setLoadingMessage("No students found");
    console.log(response.result);
  };

  useEffect(() => {
    apiGetModuleLeaderStudents(endpoint);
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
            <ImageCard
              key={student.UserID}
              title={`${student.FirstName} ${student.LastName}`}
              subtitle={student.Email}
              imgUrl={student.UserImageURL}
            />
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default Home;
