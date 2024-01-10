import React, {useState, useEffect} from 'react';
import io from "socket.io-client";

//import Axios from "axios";
//import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001");

function RoomComponent() {
    //room state
    const [room, setRoom]=useState("");

    //message states
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const joinRoom = () => {
        if(room !== ""){
            socket.emit("join_room", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", {message, room});
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        });
    }, [socket]);

    console.log('RoomComponent')

  return (
    <div className="roomComponent">
        {/*<label>RoomComponent Component</label>*/}
        <input 
            placeholder='Room Number...'
            onChange={(event) => {
                setRoom(event.target.value);
            }}
        />
        <button onClick={joinRoom}>Join Room</button>
        <input
            placeholder="Message..."
            onChange={(event) => {
                setMessage(event.target.value)
            }}
        />
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message:</h1>
        {messageReceived}
    </div>
  );
}

export default RoomComponent