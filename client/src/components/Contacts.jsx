import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [Query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const filteredContacts = contacts.filter((contact) => { 
    return contact.username.toLowerCase().includes(Query.toLowerCase());
  });

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>MERN Chat</h3>
          </div>

          <div className="search-box">
            <input type="search" value={Query} onChange={e => setQuery(e.target.value)} name="search" id="search" placeholder="🔍Search🔎" />
          </div>

          <div className="contacts">
            {filteredContacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 9% 6% 75% 10%;
  overflow: hidden;
  // background-color: #080420;
  background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 40%, rgba(4,25,198,1) 60%, rgba(2,0,36,1) 100%);
  box-shadow: inset 0 0 10px 7px darkblue;
  .brand {
    display: flex;
    align-items: center;
    gap: .3rem;
    justify-content: space-evenly;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .search-box {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  input {
    background: transparent;
    margin: 5px auto;
    color: white;
    border-radius: 1rem;
    border: none;
    box-shadow: 0 0 10px 7px darkblue;
    text-align: center;
    height: 1.6rem;
    width: 98%;
    font-size: 1.1rem;
    padding: 0.1rem 0.8rem;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      flex-direction: row;
      gap: .5rem;
      align-items: center;
      transition: 0.4s ease-in-out;
      .avatar {
        img {
          height: 2.5rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      @media screen and (min-width: 120px) and (max-width: 720px) {
        flex-direction: column;
        font-size: 0.75rem;
        padding: 0.1rem;
        .username{
          h3{
            text-align: left;
          }
        }
      }
    }
    .contact: hover {
      box-shadow: 0 4px 6px 3px black;
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  
  .current-user {
    // background-color: #0d0d30;
    background: rgb(2,0,36);
    background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 60%);
    box-shadow: 0 0 10px 7px darkblue;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: .3rem;
    .avatar {
      img {
        height: 2.5rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 120px) and (max-width: 720px) {
      gap: 0.5rem;
      flex-direction: column;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }

  }
`;
