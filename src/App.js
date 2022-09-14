import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [passed, setPassed] = useState(0);
  const tests = [
    ["5 3", "8"],
    ["2 4", "6"]
  ]
  function submit() { 
   
    tests.forEach((test, i) => {

      fetch("http://localhost:3000/submit", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          code,
          language: "java",
          input: test[0],
        })
        
      }).then(response => {
        console.log(response);
        return response.json()
      })
      .then(data => {
        console.log(data);
        if (data.output == test[1]) {
          setPassed(prev => prev + 1);
        }
        else {
          alert("Failed on test" + i)
        }
      })
    });
    if (passed == tests.length) {
      alert("Correct!");
    }
  }

  useEffect(() => {
    if (passed == tests.length) {
      alert("passed all cases")
    }
  }, [passed])
  return (
    <>
    Given a and b print a + b
    <textarea value = {code} onChange = {e => setCode(e.target.value)}>

    </textarea>
    {code}
    <button onClick={submit}></button>
    </>
  );
}

export default App;
