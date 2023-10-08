import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const fetchUrl = "http://localhost:4000/questions"

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  function handleSubmit(e, formData) {
    e.preventDefault()
    const newItem = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4
      ],
      correctAnswer: formData.correctAnswer
    }
    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify(newItem)
    })
    .then(res => res.json())
    .then(updatedItem => {
      setQuestions([
        ...questions,
        updatedItem
      ])
    })
  }

  function handleDelete(id) {
    fetch(`${fetchUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(setQuestions(questions.filter(item => {
      return item.id !== id
    })))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleSubmit={handleSubmit} questions={questions}/> : <QuestionList handleDelete={handleDelete} questions={questions}/>}
    </main>
  );
}

export default App;
