import React, {
  useEffect,
  useRef,
  useState,
  unstable_batchedUpdates,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";
import "./style.css";
import Prescription from "./Prescription";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MedicationIcon from "@mui/icons-material/Medication";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FolderIcon from "@mui/icons-material/Folder";
import Popup from "../components/showPresriptionPopup";
import Popup1 from "../components/PrescriptionDetailsPopup";
import { Tooltip } from "@mui/material";
const socket = io.connect("http://localhost:5000");
// const socket = io.connect("https://ssfservice.in/");

const Conference = () => {
  const [max, setMax] = useState(0);
  const [state, setState] = useState("Video");
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const [isCallable, setIsCallable] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [MyStream, setMyStream] = useState(null);
  const [idx, setIdx] = useState();
  const [show, setShow] = useState(0);
  const para = useParams();
  const [id, setId] = useState(para.id);
  const history = useHistory();

  useEffect(() => {
    // Create a new Peer instance
    const peer = new Peer();
    // Get the room ID from localStorage
    const room = localStorage.getItem("room");

    // Define cross-browser getUserMedia function
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    // Request user's media stream with video and audio
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      // Set the user's media stream in state
      setMyStream(mediaStream);
      // Display the user's video stream in the local video element
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
    });

    // Event: Peer connection is established and gets an ID
    peer.on("open", (id) => {
      // Set the peer ID in state
      setPeerId(id);
      // Emit a "join-room" event to the server with room and peer ID
      socket.emit("join-room", room, id);
    });

    // Event: Incoming call from another peer
    peer.on("call", (call) => {
      // Request user's media stream with video and audio
      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        // Set the user's media stream in state
        setMyStream(mediaStream);
        // Display the user's video stream in the local video element
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          // Display the remote peer's video stream in the remote video element
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });

    // Event: Peer connection is disconnected
    peer.on("disconnected", () => {
      // Stop the user's video tracks and clear the local video element
      currentUserVideoRef.current.srcObject
        ?.getVideoTracks()
        .forEach((track) => {
          if (track.kind === "video") {
            track.stop();
          }
        });
      currentUserVideoRef.current.srcObject = undefined;
    });

    // Event: Peer connection is closed
    peer.on("close", () => {
      // Clear the remote video element
      remoteVideoRef.current.srcObject = undefined;
    });

    // Save the Peer instance for future reference
    peerInstance.current = peer;

    // Store initial data in localStorage
    localStorage.setItem("sympt", "");
    localStorage.setItem("instruction", "");
    localStorage.setItem("diagnosis", "");
    localStorage.setItem("numberMed", "");
    localStorage.setItem("test", "");
    localStorage.setItem("other", "");
    localStorage.setItem("other", "");
    localStorage.setItem("date", "");
    // Clear specific items in localStorage
    localStorage.setItem("arr", []);
  }, []);

  const sendMessage = () => {
    // If the message is empty, return (don't send an empty message)
    if (!message) return;
    // console.log(message);

    // Create an object with the message and alignment (flex-end)
    const data = {
      message: message,
      alignment: "flex-end",
    };

    // Clear the text input field for the message
    document.getElementById("chat_message").value = "";
    const arr = [...messageList];

    // Create a new array by spreading the current messageList array
    setMessageList((arr) => [...arr, data]);

    // Get the room ID from localStorage
    const room = localStorage.getItem("room");
    // Emit a "send-message" event to the server with the message and room ID
    socket.emit("send-message", message, room);
    // Clear the message state variable
    setMessage("");
  };

  const endCall = () => {
    // Get the room ID from localStorage
    const room = localStorage.getItem("room");
    // Emit a "leave-room" event to the server with room and peer ID
    socket.emit("leave-room", room, peerId);

    // Disconnect the Peer instance
    peerInstance.current.disconnect();

    // Get the doctor's name from localStorage
    const doc_name = JSON.parse(localStorage.getItem("DoctorOnline")).name;
    // Redirect the user to the prescription page with the specific ID
    history.push("/prescription/" + id);
    // Reload the window
    window.location.reload();
  };

  useEffect(() => {
    // Event: Receive a message from another user
    socket.off("recieve-message").on("recieve-message", (message) => {
      // Create an object with the received message and alignment (initial)
      const data = {
        message: message,
        alignment: "initial",
      };
      // Create a new array by spreading the current messageList array
      const arr = [...messageList];
      // Update the messageList state with the new message
      setMessageList((arr) => [...arr, data]);
    });
    // Event: Another user connects to the room
    socket.on("user-connected", (id) => {
      // Create a message object indicating the user has connected
      const data = {
        message: "User Connected",
        alignment: "center",
      };
      // Create a new array by spreading the current messageList array
      const arr = [...messageList];
      // Update the messageList state with the new message
      setMessageList((arr) => [...arr, data]);
      // Set the 'isCallable' state to true, indicating a user is available for call
      setIsCallable(true);
      // Set the 'remotePeerIdValue' state with the connected user's ID
      setRemotePeerIdValue(id);
      // Initiate a call to the connected user
      call(id);
    });
    // Event: Another user disconnects from the room
    socket.on("user-disconnected", (id) => {
      const data = {
        // Create a message object indicating the user has disconnected
        message: `user Disconnected ${id}`,
        alignment: "center",
      };
      // Create a new array by spreading the current messageList array
      const arr = [...messageList];
      // Update the messageList state with the new message
      setMessageList((arr) => [...arr, data]);
    });
  }, [socket]);

  function call(remotePeerId) {
    // Check if the remotePeerId is available
    if (!remotePeerId) {
      return;
    }

    // Define cross-browser getUserMedia function
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    // Request user's media stream with video and audio
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      // Display the user's video stream in the local video element
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
      // Set the user's media stream in state
      setMyStream(mediaStream);

      // Initiate a call to the remote peer with the media stream
      const call = peerInstance.current.call(remotePeerId, mediaStream);

      // Event: Remote peer's stream is received
      call.on("stream", (remoteStream) => {
        // Log the remote stream object to the console
        console.log(remoteStream);
        // Display the remote peer's video stream in the remote video element
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  }

  const videoPause = () => {
    // Toggle the 'video' state variable
    setVideo(!video);
    // Get the first video track from the user's media stream
    // Toggle the 'enabled' property of the video track
    MyStream.getVideoTracks()[0].enabled =
      !MyStream.getVideoTracks()[0].enabled;
  };

  const audioPause = () => {
    setAudio(!audio);
    MyStream.getAudioTracks()[0].enabled =
      !MyStream.getAudioTracks()[0].enabled;
  };

  function selectComponent() {
    switch (show) {
      case 0:
        return null;
      case 1:
        return <Popup setShow={setShow} setid={setIdx} />;
      case 2:
        return <Popup1 setShow={setShow} Idx={idx} />;
      default:
        return null;
    }
  }
  //e handels the keyboard events
  const keyHandler = (e) => {
    // Check if the pressed key is "Enter" and if the shift key is not pressed
    if (e.key === "Enter" && !e.shiftKey) {
      // Call the sendMessage function when conditions are met
      sendMessage();
    }
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <h3>Conference</h3>
        </div>
      </div>
      <div className="main">
        <div className="main__left">
          <div className="prescription_area">
            <Prescription />
          </div>
          <div className="options">
            <div className="options__left">
              <div id="stopVideo" className="options__button">
                {video === true ? (
                  <Tooltip title="Turn Off Camera">
                    <button
                      className="options__button"
                      onClick={() => {
                        videoPause();
                      }}>
                      {" "}
                      <VideocamIcon
                        fontSize="large"
                        sx={{ width: "50px" }}
                      />{" "}
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Turn On Camera">
                    <button
                      className="options__button"
                      onClick={() => {
                        videoPause();
                      }}>
                      {" "}
                      <VideocamOffIcon
                        fontSize="large"
                        sx={{ width: "50px" }}
                      />{" "}
                    </button>
                  </Tooltip>
                )}
              </div>
              <div id="muteButton" className="options__button">
                {audio ? (
                  <Tooltip title="Turn Off Audio">
                    <button
                      className="options__button"
                      onClick={() => {
                        audioPause();
                      }}>
                      {" "}
                      <MicIcon fontSize="large" sx={{ width: "50px" }} />{" "}
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Turn On Audio">
                    <button
                      className="options__button"
                      onClick={() => {
                        audioPause();
                      }}>
                      {" "}
                      <MicOffIcon
                        fontSize="large"
                        sx={{ width: "50px" }}
                      />{" "}
                    </button>
                  </Tooltip>
                )}
              </div>
              <div className="options__button">
                <Tooltip title="End Conference">
                  <button
                    className="options__button"
                    onClick={() => {
                      endCall();
                    }}>
                    {" "}
                    <CallEndIcon fontSize="large" sx={{ width: "50px" }} />{" "}
                  </button>
                </Tooltip>
              </div>
              <div id="muteButton" className="options__button">
                <Tooltip title="Check Old Prescription">
                  <button
                    className="options__button"
                    onClick={() => {
                      setShow(1);
                    }}>
                    {" "}
                    <FolderIcon fontSize="large" sx={{ width: "50px" }} />{" "}
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="main__right">
          <div className="videos__group">
            <div id="video-grid">
              <video ref={currentUserVideoRef} />
              <video ref={remoteVideoRef} />
            </div>
          </div>

          <div className="main__chat_window">
            {messageList.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="message"
                  style={{ alignSelf: item.alignment }}>
                  {item.message}
                </div>
              );
            })}
          </div>

          <div className="main__message_container">
            <input
              id="chat_message"
              type="text"
              placeholder="Type message here..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => keyHandler(e)}
            />
            <Tooltip title="Send Message">
              <button
                id="send"
                className="options__button"
                type="submit"
                onClick={sendMessage}>
                <KeyboardArrowRightIcon
                  fontSize="large"
                  sx={{ width: "50px" }}
                />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      {selectComponent()}
    </div>
  );
};

export default Conference;
