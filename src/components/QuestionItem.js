import React from "react";

function QuestionItem({ question, onDeleteQuestion, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleClickDelete() {
    //console.log(id);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then( () => onDeleteQuestion(id))
   }
   function handleChange(e) {
    console.log(typeof e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": parseInt(e.target.value),
      })
    })
    .then( res => res.json())
    .then((updatedQuestion) => onAnswerChange(updatedQuestion))
   }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleClickDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
