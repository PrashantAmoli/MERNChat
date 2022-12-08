import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async ()=>{
   const setTheState = async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    };
    await setTheState();
  }, []);
  return (
    <Container>
      <div className="logout-box">
        <h2>Logout</h2>
        <Logout />
      </div>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{ userName }!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
      <h2>Most id's have been preloaded for you to test the app with the password being same as username.</h2>
      <h2>username: elonmusk</h2>
      <h2>password: elonmusk</h2>
    </Container>
  );
}

const Container = styled.div`
  gap: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  .logout-box {
    min-width: 8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;
