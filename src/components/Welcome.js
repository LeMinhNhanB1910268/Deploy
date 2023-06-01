import React, { useEffect, useState } from "react";
import "./Welcome.scss";
import { createHistory, getAllHistory } from "../service/historyService";
import Modal from "./Modal";
import NewMessage from "./NewMessage";
import {AnswerOpenAI} from "../service/Answer";
import { createQuestion } from "../service/questionService";
import { useNavigate } from "react-router-dom";
export default function Welcome(props) {
  const navigate = useNavigate();
  const [InputChat, setInputChat] = useState("");
  const [newQuestion, setNewQuestion] = useState(null);
  const [history_id, setHistoryID] = useState('');
  const [ID] = useState(localStorage.getItem("user_i"));
  const [recognition, setRecognition] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition;

    if (!SpeechRecognition) {
      console.log(
        "Trình duyệt của bạn không hỗ trợ chuyển đổi giọng nói thành văn bản."
      );
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "vi-VN";

    recognitionInstance.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setInputChat(transcript);
    };

    setRecognition(recognitionInstance);
  }, []);
  const handleSendChat = async () => {
    let res = await createHistory({ title: InputChat, user_id: ID });
    setHistoryID(res._id)
    const text = InputChat;
    const obj = { content: text, answer: '' }
    setInputChat('');
    // setScrollEnd(true);
    setNewQuestion(obj)
    const data = {
      "model": "gpt-3.5-turbo",
      "messages": [{ "role": "user", "content": text }],
      "max_tokens": 499
    }
    const response = await AnswerOpenAI(data)
    setNewQuestion({ content: text, answer: response.choices[0].message.content })
    props.Add_History(res)
    // setScrollEnd(true);
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setModalIsOpen(true);
    }
  };
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setModalIsOpen(false);
    }
  };
  const AddQuestion = async (data) =>{
    const res = await createQuestion(data);
    return res;
    // console.log(res); 
    // setQuestion([res,...question])
    // setNewQuestion(null)
    // setScrollEnd(true)
  }
  const showMenu = () => {
    // console.log('a');
    const menu = document.querySelector(".col-2");
    // console.log(menu.style.display)
    menu.style.position = "absolute";
    menu.style.animation = "slideInFromRight 0.2s ease-out";
    menu.style.display = "block";
    document.querySelector(".col-10").style.pointerEvents = "none";
    document.querySelector(".col-10").style.opacity = 0.5;
  };
  return (
    <div className="content-welcome">
      <Modal
        modalIsOpen={modalIsOpen}
        transcript={InputChat}
        stopListening={stopListening}
      ></Modal>
      <div className="header-chat">
        <i
          onClick={() => {
            showMenu();
          }}
          type="button"
          className="fa-sharp fa-solid fa-bars"
        ></i>
      </div>
      {!newQuestion ?
        (<div className="title">
          <div className="row">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1>Welcome to ChatABC</h1>
            </div>
            <div className="col-4">
              <span>Example</span>
            </div>
            <div className="col-4">
              <span>Example</span>
            </div>
            <div className="col-4">
              <span>Example</span>
            </div>
          </div>
        </div>)
        :
        (
          <div className="Chatbox" >
            {newQuestion && <NewMessage AddQuestion={AddQuestion} question={newQuestion} history_id={history_id} setScrollEnd={null} />}
          </div>
        )}
      <div className="footer-chat">
        <div className="chat">
          {/* <form onSubmit={(e)=>handleSendChat(e)}> */}
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setInputChat("");
                handleSendChat();
              }
            }}
            type="text"
            className="input-chat"
            maxLength={10000}
            placeholder="Type your message...."
            onChange={(event) => {
              setInputChat(event.target.value);
              var textarea = document.querySelector(".input-chat");
              var div = textarea.parentElement;
              console.log(textarea.scrollHeight);
              if (textarea.scrollHeight > 46 && textarea.scrollHeight < 100)
                div.style.height = textarea.scrollHeight + "px";
              if (event.target.value === "") {
                div.style.height = "50px";
              }
            }}
            value={InputChat}
          ></textarea>
          {/* </form> */}
          <div className="group-button">
            <i
              className="fa-solid fa-microphone"
              type="button"
              onClick={() => {
                startListening();
              }}
            ></i>
            {InputChat !== "" ? (
              <i
                style={{ color: "black" }}
                type="button"
                className="fa-solid fa-paper-plane"
                onClick={() => {
                  handleSendChat();
                }}
              ></i>
            ) : (
              <i className="fa-solid fa-paper-plane"></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
