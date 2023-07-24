import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FaqEditor() {

    const [questions, setQuestions] = useState([])


    function getQuestions() {
        axios.get(process.env.REACT_APP_BACK_ADDRESS +  "/get_questions/")
        .then(res => {
            console.log(JSON.parse(res.data))
            setQuestions(JSON.parse(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getQuestions()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_BACK_ADDRESS +  "/add_question/", {
            question: e.target.question.value,
            answer: e.target.answer.value
        })
        .then(res => {
            console.log(res)
            getQuestions()
        })
        .catch(err => {
            console.log(err)
        })
    }

    // const changeQuestion = (e, index) => {
    //     const newQuestions = [...questions]
    //     newQuestions[index].question = e.target.value
    //     setQuestions(newQuestions)
    // }

    const changeAnswer = (e, index) => {
        const newQuestions = [...questions]
        newQuestions[index].answer = e.target.value
        setQuestions(newQuestions)
    }

    const updateQuestion = (index) => {
        axios.post(process.env.REACT_APP_BACK_ADDRESS +  "/update_question/", {
            question: questions[index].question,
            answer: questions[index].answer
        })
        .then(res => {
            console.log(res)
            getQuestions()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deleteQuestion = (index) => {
        axios.post(process.env.REACT_APP_BACK_ADDRESS +  "/delete_question/", {
            question: questions[index].question,
            answer: questions[index].answer
        })
        .then(res => {
            console.log(res)
            getQuestions()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div style={{marginBottom:'20px'}}>
            <h1>FAQ Editor</h1>
            {questions.map((question, index) => {
                return (
                    <div key={index} 
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        width: '80%',
                        margin: '10px auto'
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: '100%',
                            alignItems: "flex-start",
                            margin: '10px auto'
                        }}>
                            <label>{question.question}</label>  
                            <textarea value={question.answer} style={{width: '100%', height: '50px'}} onChange={(e) => changeAnswer(e, index)} />
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: '10%',
                            margin: '0 10px 10px'
                        }}>
                            <button onClick={() => updateQuestion(index)}
                            >Update</button>
                            <button onClick={() => deleteQuestion(index)}>Delete</button>
                        </div>
                    </div>
                )
            })}
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                width: '80%',
                margin: '10px auto'
            }}>
                <h2>Add Question</h2>
                <label htmlFor="question">Question
                </label>
                <input style={{width: '100%', margin: '10px 0'}} type="text" name="question" id="question" />

                <label htmlFor="answer">Answer
                </label>
                <input style={{width: '100%', margin: '10px 0'}} type="text" name="answer" id="answer" />
                <button type="submit" style={{
                        width: '200px',
                        height: '40px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        borderWidth: '0px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        margin: '15px auto 10px'

                    }}>Submit</button>
            </form>
        </div>
    )
}
