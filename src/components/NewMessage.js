import React, { useEffect, useState,useRef } from 'react'
import Typed from "typed.js";
import { TextSpeechZaloAI } from '../service/Text_Speech';
import { useNavigate } from "react-router-dom";
export default function NewMessage({ question, AddQuestion ,history_id,setScrollEnd}) {
    const answer = useRef(null);
    const navigate = useNavigate();
    useEffect(async () => {
        if (question.answer !== '') {
            const typed = new Typed(answer.current, {
                strings: [question.answer],
                typeSpeed: 10,
                onStringTyped: function() {
                    if(setScrollEnd !== null)
                    setScrollEnd(true)
                },
                onComplete: async function () {
                    let content = question.content;
                    let answer = question.answer;
                    if (question.content.length > 400) 
                         content = question.content.slice(0, 400);
                    if(question.answer.length > 400)
                         answer = question.answer.slice(0,400);
                    const audio_question = await TextSpeechZaloAI(content)
                    const audio_answer = await TextSpeechZaloAI(answer)
                    const data = {
                        history_id: history_id,
                        content: question.content,
                        answer: question.answer,
                        url_audio_content: audio_question.data.url,
                        url_audio_answer:audio_answer.data.url,
                        // url_audio_content: '',
                        // url_audio_answer: '',
                    }
                    const res = await AddQuestion(data)
                    if(setScrollEnd === null )
                    navigate(`/chat/history/${res.history_id}`)
                }
            });
            return () => {
                typed.destroy();
            };
        }
    }, [question]);
    return (
        <div>
            <div className="chat-user">
                <div className="chat-item">
                    <div className="chatUser">
                        <p>{question.content}</p>
                    </div>
                </div>
            </div>
            {question.answer !== null ? (
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
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div className="chat-bot">
                        <div className="chat-item">
                            <div className="chatUser">
                                <p ref={answer}></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
