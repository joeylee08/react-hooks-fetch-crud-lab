import React from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({questions, handleDelete, handleChange}) {
  const questionItems = questions.map(item => {
    return <QuestionItem handleChange={handleChange} handleDelete={handleDelete} question={item}/>
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
