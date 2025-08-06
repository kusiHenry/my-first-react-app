// Import CSS Modules
import styles from "./styles/Button.module.css";

// A presentational component that shows name, age, and a button to select the student

function Student({ name, age, onSelect }) {
  const isMature = age > 21;

  const infoStyle = { fontSize: "1rem", marginBottom: "0.5rem", };
  // Function triggers the parent function when the button is clicked

  

  return (
    <div style={{ marginBottom: "1rem", padding: "0.5rem 0" }}>
        <p style={infoStyle}>
           <span>
            <strong>{name}</strong> — Age: {age}
            {isMature && (
                <span style={{ color: "green", fontWeight: "bold", marginLeft: "10px" }}>
                    Mature Student
                </span>
            )}
            </span> 
        </p>
      

      {/* Button to trigger selection */}
      <div>
        <button className={styles.button} onClick= { () => onSelect(name)} >
          Select Student
        </button>
      </div>
    </div>
  );
}

export default Student;
