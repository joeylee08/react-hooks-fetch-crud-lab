import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const fetchUrl = "http://localhost:4000/questions"

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState(null);


  useEffect(() => {
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
      })
  }, [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions}/> : <QuestionList questions={questions}/>}
    </main>
  );
}

export default App;
