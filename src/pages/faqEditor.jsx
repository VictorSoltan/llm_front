import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

export default function FaqEditor() {
  const [questions, setQuestions] = useState([]);

  function getQuestions() {
    axios
      .get(process.env.REACT_APP_BACK_ADDRESS + "/get_questions/")
      .then((res) => {
        console.log(JSON.parse(res.data));
        setQuestions(JSON.parse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BACK_ADDRESS + "/add_question/", {
        question: e.target.question.value,
        answer: e.target.answer.value,
      })
      .then((res) => {
        console.log(res);
        getQuestions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const changeQuestion = (e, index) => {
  //     const newQuestions = [...questions]
  //     newQuestions[index].question = e.target.value
  //     setQuestions(newQuestions)
  // }

  const changeAnswer = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = e.target.value;
    setQuestions(newQuestions);
  };

  const updateQuestion = (index) => {
    axios
      .post(process.env.REACT_APP_BACK_ADDRESS + "/update_question/", {
        question: questions[index].question,
        answer: questions[index].answer,
      })
      .then((res) => {
        console.log(res);
        getQuestions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteQuestion = (index) => {
    axios
      .post(process.env.REACT_APP_BACK_ADDRESS + "/delete_question/", {
        question: questions[index].question,
        answer: questions[index].answer,
      })
      .then((res) => {
        console.log(res);
        getQuestions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center" style={{ marginBottom: "20px" }}>
      <h2 className="my-5 text-xl">FAQ Editor</h2>
      {questions.map((question, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "80%",
              margin: "10px auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "flex-start",
                margin: "10px auto",
              }}
            >
              <label className="pr-4 border-b-2 border-slate-300 mb-1">
                {question.question}
              </label>
              <TextareaAutosize
                className="w-full border-b-2 border-l-2 p-1 border-slate-400"
                value={question.answer}
                onChange={(e) => changeAnswer(e, index)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 10px 40px",
              }}
            >
              <button
                className="bg-slate-200 p-2 self-start"
                onClick={() => updateQuestion(index)}
              >
                Update
              </button>
              <button
                className="bg-red-300 p-2 self-start mt-2"
                onClick={() => deleteQuestion(index)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "80%",
          margin: "10px auto",
        }}
      >
        <h2 className="my-5 text-lg m-auto">Add FAQ</h2>
        <label htmlFor="question">Question</label>
        <TextareaAutosize
          className="w-full border-b-2 border-l-2 p-1"
          style={{ width: "100%", margin: "10px 0" }}
          type="text"
          name="question"
          id="question"
        />

        <label htmlFor="answer">Answer</label>
        <TextareaAutosize
          className="w-full border-b-2 border-l-2 p-1"
          style={{ width: "100%", margin: "10px 0" }}
          type="text"
          name="answer"
          id="answer"
        />
        <button
          type="submit"
          style={{
            width: "200px",
            height: "40px",
            fontSize: "20px",
            borderRadius: "10px",
            borderWidth: "0px",
            backgroundColor: "#4CAF50",
            color: "white",
            margin: "15px auto 10px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
