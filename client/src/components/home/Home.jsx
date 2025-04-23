import React, { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import throttle from 'lodash.throttle'
import { Cursor } from '../cursor/Cursor'

function Home({ username }) {

    const renderCursors = users => {

        return Object.keys(users).map(uuid => {
            const user = users[uuid];
            const state = { x: user.state.x, y: user.state.y };
            return <Cursor key={uuid} point={state} />
    
        })
    }
    
    const renderUserList = users => {
        
        return Object.keys(users).map(uuid => {
               const user=users[uuid];
               return(  
             <li>
                 <p>{user.username}</p>
                 <p>Position X-cordinate : {user.state.x}  Y-cordinate : {user.state.y}</p>
             </li>
               )
         })
     }

//Best Practice would be using .env file to store the WS url
    const wsURL = "ws://localhost:8080";
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsURL, { queryParams: { username } })

    const THROTTLE = 1000;
    const throttledSendJsonMessage = useRef(throttle(sendJsonMessage, throttle));

    useEffect(() => {
        const handleMouseMove = (e) => {

            throttledSendJsonMessage.current({
                x: e.clientX,
                y: e.clientY
            });
        };

        sendJsonMessage({ x: 0, y: 0 });
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    if (lastJsonMessage) {
        return (
            <>
            {renderUserList(lastJsonMessage)}
                {renderCursors(lastJsonMessage)}

            </>

        )
    }
    return (
        <div>Waiting For Other Users...</div>
    )

}

export default Home