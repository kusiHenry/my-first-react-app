import { useState, useEffect, useRef } from 'react';
import Student from './components/Student';
import Header from './components/Header';
import ContactCard from './components/ContactCard';

import './components/styles/global.css';

function App() {
  // ================== Students ==================
  const students = [
    { name: "Alice", age: 19 },
    { name: "Bob", age: 22 },
    { name: "Charlie", age: 20 },
    { name: "David", age: 25 },
    { name: "Eve", age: 18 },
    { name: "Kusi", age: 48 }
  ];

  const [count, setCount] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState("");

  const handleShowMore = () => {
    if (count < students.length) {
      setCount(prev => prev + 1);
    }
  };

  const onClickStudent = (studentName) => {
    setSelectedStudent(studentName);
  };

  // ================== Contacts ==================
  const [contacts, setContacts] = useState([
    {
      name: "Jane Kusi",
      email: "jane@kusi.com",
      phone: "123-456-7890",
      source: "local"
    },
    {
      name: "John Kusi",
      email: "johnhenry@kusi.com",
      phone: "987-654-3210",
      source: "external"
    }
  ]);

  // Form input state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Basic validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Add new contact
      setContacts(prev => [
        ...prev,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: "external" // or "local" if needed
        }
      ]);

      // Reset form
      setFormData({ name: "", email: "", phone: "" });
    }
  };

  // Focus on first invalid field when errors occur
  useEffect(() => {
    if (errors.name) {
      nameRef.current?.focus();
    } else if (errors.email) {
      emailRef.current?.focus();
    } else if (errors.phone) {
      phoneRef.current?.focus();
    }
  }, [errors]);

  return (
    <div className="app-container">
      <Header />

      {/* Student List */}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {students.slice(0, count).map((student, index) => (
          <li key={index}>
            <Student
              name={student.name}
              age={student.age}
              onSelect={onClickStudent}
            />
          </li>
        ))}
      </ul>

      {count < students.length && (
        <button
          onClick={handleShowMore}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Show Next Student
        </button>
      )}

      {selectedStudent && (
        <div style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
          Selected Student: <strong>{selectedStudent}</strong>
        </div>
      )}

      {/* Contact List */}
      <div style={{ marginTop: "3rem" }}>
        <h1>Contact List</h1>
        {contacts.map((contact, index) => (
          <ContactCard
            key={index}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            source={contact.source}
          />
        ))}
      </div>

      {/* Add Contact Form */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Add Contact</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              ref={nameRef}
            />
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              ref={emailRef}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              ref={phoneRef}
            />
            {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
          </div>

          <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
