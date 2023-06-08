import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ChatContainer.scss";
import { getQuestion, updateLike } from "../service/questionService";
import { createQuestion } from "../service/questionService";
import {AnswerOpenAI} from "../service/Answer";
import axios from "axios";
import Modal from "./Modal";
import NewMessage from "./NewMessage";
import { TextSpeechZaloAI } from "../service/Text_Speech";
export default function ChatContainer(props) {
  const [question, setQuestion] = useState("");
  const [playing_audio_id,setPlaying] = useState("");
  const [InputChat, setInputChat] = useState("");
  const [next_page_url, setNextPageUrl] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [audio, setAudio] = useState();
  const [scrollEnd, setScrollEnd] = useState(true);
  const [newQuestion , setNewQuestion] = useState(null)
  const params = useParams();
  
  const { id } = params;
  useEffect(() => {
    if (id) {
      getChat();
    }
  }, [id]);
  useEffect(() => {
    var objDiv = document.querySelector(".Chatbox");
    var scrollHeight = objDiv.scrollHeight;
    objDiv.scrollTop = scrollHeight;
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Trình duyệt của bạn không hỗ trợ chuyển đổi giọng nói thành văn bản."
      );
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "vi-VN";

    recognitionInstance.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setModalIsOpen(false);
      setInputChat(transcript);
    };

    setRecognition(recognitionInstance);
  }, []);
  useEffect(() => {
    if (scrollEnd === true) {
      var objDiv = document.querySelector(".Chatbox");
      var scrollHeight = objDiv.scrollHeight;
      objDiv.scrollTop = scrollHeight;
    }
    setScrollEnd(false);
  }, [scrollEnd]);

  const getChat = async () => {
    let rp = await getQuestion(id);
    setQuestion(rp.data);
    if (rp.url_next_page !== null)
      setNextPageUrl(rp.url_next_page.replace("http://", "https://"));
    else setNextPageUrl(null);
    setScrollEnd(true);
  };

  const playAudio = async (url,content) => {
    // if (content.length > 400) 
    //   content = content.slice(0, 499);
    // if(url!==""){
      const Audio_obj = new Audio(url);
      Audio_obj.addEventListener("ended", () => {
        setAudio("");
      });
      Audio_obj.play();
      setAudio(Audio_obj);
    // }else{
    //   const res = await TextSpeechZaloAI(content)
    //   console.log("url", res.data.url);
    //   const Audio_obj = new Audio(res.data.url);
    //   Audio_obj.addEventListener("ended", () => {
    //     setAudio("");// Thực hiện hành động sau khi âm thanh kết thúc
    //   });
    //   Audio_obj.play();
    //   setAudio(Audio_obj);
    // }
  };
  const StopAudio = () => {
    audio.pause();
    setAudio("");
  };
  const AddQuestion = async (data) =>{
    const res = await createQuestion(data);
    // console.log(res); 
    setQuestion([res,...question])
    setNewQuestion(null)
    setScrollEnd(true)
    return res;
  }
  const handleSendChat = async () => {
    // setInputChat('')
    const text = InputChat;
    const obj = {content:text ,answer: ''}
    setInputChat('');
    setScrollEnd(true);
    setNewQuestion(obj)
    const data = {"model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "trả lời tôi "+text+"? và cho tôi biết câu hỏi thuộc chủ dề nào trong các chủ đề sau:\n1. chính trị\n2. du lịch\n3. lịch sử\n4. nghệ thuật\n5. công nghệ\n6. nông nghiệp\n7. kinh tế\n8. y tế\n9. môi trường\n10. tình cảm\n11. thiên văn\n12. động vật\n13. thực vật\n14. học tập\n15. khác "}],
    "max_tokens": 499
    }
    const response = await AnswerOpenAI(data)
    setNewQuestion({content:text ,answer: response.choices[0].message.content})
    setScrollEnd(true);
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
  const showMenu = () => {
    // console.log('a');
    const menu = document.querySelector(".col-2");
    // console.log(menu.style.display)
    menu.style.animation =
      "0.2s ease-out 0s 1 normal none running slideInFromRight";
    menu.style.position = "absolute";
    menu.style.display = "block";
    document.querySelector(".col-10").style.pointerEvents = "none";
    document.querySelector(".col-10").style.opacity = 0.5;
  };
  function updateObject(array, objectId, newValues) {
    return array.map((obj) => {
      if (obj._id === objectId) {
        return { ...obj, ...newValues };
      }
      return obj;
    });
  }
  const handleLike = async (item, favorite) => {
    item.favorite = favorite;
    setQuestion(updateObject(question, item._id, item));
    const res = await updateLike(item._id, { favorite: favorite });
    // setQuestion(updateObject(question,id,res))
  };

  const copyTextUser = (text) => {
    navigator.clipboard.writeText(text);
  };
  const handleScroll = (event) => {
    var token = localStorage.getItem("token");
    const target = event.target;
    // console.log(target.scrollHeight - target.scrollTop)
    // console.log(target.scrollHeight)
    if (
      target.scrollHeight - target.scrollTop === target.scrollHeight &&
      next_page_url !== null
    ) {
      axios
        .get(next_page_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setQuestion([...question, ...res.data.data]);
          if (res.data.url_next_page !== null)
            setNextPageUrl(
              res.data.url_next_page.replace("http://", "https://")
            );
          else setNextPageUrl(null);
        });
    }
  };
  const Timer = (time) => {
    var gmtTime = new Date(time);
    // Lấy giờ, phút và giây của thời gian GMT
    var gmtHours = gmtTime.getUTCHours();
    var gmtMinutes = gmtTime.getUTCMinutes();
    var gmtSeconds = gmtTime.getUTCSeconds();

    // Chuyển đổi sang múi giờ Việt Nam (GMT+7)
    var vnHours = gmtHours + 7;
    // Tạo một đối tượng Date mới với múi giờ Việt Nam
    var vnTime = new Date(gmtTime);
    vnTime.setHours(vnHours, gmtMinutes, gmtSeconds);
    // Lấy thông tin thời gian ở múi giờ Việt Nam
    var vnDateString = vnTime.toDateString();
    var vnTimeString = vnTime.toTimeString();
    vnTimeString = vnTimeString.replace(/GMT\+\d{4} \(.*\)/, "");
    return vnDateString + " " + vnTimeString;
  };
  return (
    <>
      <div className="content-chat">
        <Modal
          modalIsOpen={modalIsOpen}
          transcript={InputChat}
          stopListening={stopListening}
        ></Modal>
        <div className="header1-chat">
          <i
            onClick={() => {
              showMenu();
            }}
            type="button"
            className="fa-sharp fa-solid fa-bars"
          ></i>

        </div>
        {/* {console.log('ahiihh')} */}
        <div className="Chatbox" onScroll={handleScroll}>
          {question &&
            [...question].reverse().map((item, index) => {
              return (
                  <div key={index} >
                  <div className="chat-user">
                    <div className="chat-item">
                      <div className="chatUser">
                        <p style={{ whiteSpace: 'pre-line' }}>{item.content}</p>
                      </div>
                      <hr className="space"></hr>
                      <div className="operation">
                        <div className="ahuhu">
                          <span
                            className="tool-tip"
                            type="button"
                            onClick={() => {
                              copyTextUser(item.content);
                            }}
                          >
                            <i
                              style={{ color: "gray" }}
                              className="fa-solid fa-clipboard"
                            ></i>

                            <span className="tooltiptext">Copied!</span>
                          </span>
                          <span
                            type="button"
                            onClick={() => {
                              // console.log(!audio)
                              if (!audio) playAudio(item.url_audio_content,item.content);
                              else StopAudio();
                            }}
                          >
                            {audio ? (
                              <i
                                style={{ color: "gray" }}
                                className="fa-solid fa-pause"
                              ></i>
                            ) : (
                              <i
                                style={{ color: "gray" }}
                                className="fa-solid fa-volume-high"
                              ></i>
                            )}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontSize: 12, color: "#ccc" }}>
                            {Timer(item.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.answer !== null ? (
                    <div className="message-bot">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          width: 30,
                          height: 30,
                          minWidth: 30,
                          minHeight: 30,
                          background: "white",
                        }}
                      >
                        <i className="fa-solid fa-robot"></i>
                      </div>
                      <div className="chat-bot">
                        <div className="chat-item">
                          <div className="chatUser">
                            <p style={{ whiteSpace: 'pre-line' }}>{item.answer}</p>
                          </div>
                          <hr className="space"></hr>
                          <div className="operation">
                            <div className="ahuhu">
                              <span
                                className="tool-tip"
                                onClick={() => {
                                  copyTextUser(item.answer);
                                }}
                                type="button"
                              >
                                {" "}
                                <i
                                  style={{ color: "gray" }}
                                  className="fa-solid fa-clipboard"
                                ></i>
                                <span className="tooltiptext">Copied!</span>
                              </span>
                              <span>
                                {item.favorite === true ? (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      handleLike(item, null);
                                    }}
                                    style={{ color: "blue" }}
                                    className="fa-solid fa-thumbs-up"
                                  ></i>
                                ) : (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      handleLike(item, true);
                                    }}
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-thumbs-up"
                                  ></i>
                                )}
                              </span>
                              <span>
                                {item.favorite === false ? (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      handleLike(item, null);
                                    }}
                                    style={{ color: "red" }}
                                    className="fa-solid fa-thumbs-down"
                                  ></i>
                                ) : (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      handleLike(item, false);
                                      // StopAudio(item.url_audio_content)
                                    }}
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-thumbs-down"
                                  ></i>
                                )}
                              </span>

                              <span
                                type="button"
                                onClick={() => {
                                  if (!audio) playAudio(item.url_audio_answer,item.answer);
                                  else StopAudio();
                                }}
                              >
                                {audio ? (
                                  <i
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-pause"
                                  ></i>
                                ) : (
                                  <i
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-volume-high"
                                  ></i>
                                )}
                              </span>
                            </div>
                            <div>
                              <p style={{ fontSize: 12, color: "#ccc" }}>
                                {Timer(item.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          {newQuestion && <NewMessage AddQuestion={AddQuestion} question={newQuestion} history_id = {id.toString()} setScrollEnd={setScrollEnd}/>}
        </div>
        <div className="footer-custom">
          <div className="footer-chat">
            <div className="chat">
              <textarea
                className="input-chat"
                maxLength={10000}
                placeholder="Type your message...."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    var textarea = document.querySelector(".input-chat");
                    var div = textarea.parentElement;
                    div.style.height = "50px";
                    handleSendChat();
                  }
                }}
                onChange={(event) => {
                  setInputChat(event.target.value);
                  var textarea = document.querySelector(".input-chat");
                  var div = textarea.parentElement;
                  // console.log(textarea.scrollHeight);
                  if (textarea.scrollHeight > 46 && textarea.scrollHeight < 100)
                    div.style.height = textarea.scrollHeight + "px";
                  if (event.target.value === "") {
                    div.style.height = "50px";
                  }
                }}
                value={InputChat}
              ></textarea>
              <div className="group-button">
                <i
                  className="fa-solid fa-microphone"
                  onClick={() => {
                    startListening();
                  }}
                ></i>
                {InputChat ? (
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
      </div>
    </>
  );
}
