// import { io } from "socket.io-client";
// import { BASE_URL } from "./constants";


// export const createSocketConnection=()=>{
//     if(location.hostname==="localhost"){
//         return io(BASE_URL)
//     }else{
//         return io("/",{path :"/api/socket.io"})
//     }
    
// }
import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    return io(BASE_URL, {
        withCredentials: true,  // ✅ Allows cookies/authentication
        transports: ["websocket", "polling"], // ✅ Ensures connection stability
        path: "/socket.io", // ✅ Ensure this matches backend socket path
    });
};
