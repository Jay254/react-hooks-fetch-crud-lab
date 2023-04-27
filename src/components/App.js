import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect( () =>{
    fetch('http://localhost:4000/questions')
    .then((response) =>response.json())
    .then((data) => setQuestions(data))
  }, [])

  //console.log(questions)
  function handleAnswerChange(updatedQuestion) {
      const updatedItem = questions.map( (item) => {
        if(item.id === updatedQuestion.id){
          return updatedQuestion;
        }else{
          return item;
        }
      });
      setQuestions(updatedItem);
  }
  function handleNewQuestions(newQuestions) {
    setQuestions(questions.concat(newQuestions));
  }

  function handleDeleteQuestion(id) {
      const updatedQuestions = questions.filter( (question) => question.id !== id);
      setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestions={handleNewQuestions}/> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onAnswerChange={handleAnswerChange}/>}
    </main>
  );
}

export default App;
