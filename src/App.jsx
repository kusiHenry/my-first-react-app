import { useState } from 'react';
import Student from './components/Student';
import Header from './components/Header';

import './components/styles/global.css'; //Normal CSS

function App() {
  // Array of students with name and age
  const students = [
    { name: "Alice", age: 19 },
    { name: "Bob", age: 22 },
    { name: "Charlie", age: 20 },
    { name: "David", age: 25 },
    { name: "Eve", age: 18 },
    { name: "Kusi", age: 48 }
  ];

  // Controls how many students to display
  const [count, setCount] = useState(1);

  // State to hold the selected student’s name
  const [selectedStudent, setSelectedStudent] = useState("");

  // Function to show one more student on button click
  const handleShowMore = () => {
    if (count < students.length) {
      setCount(prev => prev + 1);
    }
  };

  // Function to handle student selection from child component
  const onClickStudent = (studentName) => {
    setSelectedStudent(studentName);
  };

  return (
    <div className="app-container">
      <Header />

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {
          students.slice(0, count).map((student, index) => (
            <li key={index}>
              {/* Passing data AND the function down as props */}
              <Student 
                name={student.name} 
                age={student.age} 
                onSelect={onClickStudent} // descriptive function prop name
              />
            </li>
          ))
        }
      </ul>

      {/* Show more button */}
      {count < students.length && (
        <button
          onClick={handleShowMore}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Show Next Student
        </button>
      )}

      {/* Display selected student below the list */}
      {selectedStudent && (
        <div style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
          Selected Student: <strong>{selectedStudent}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
