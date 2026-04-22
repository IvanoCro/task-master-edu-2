import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Setup.module.css";
const Setup = ({ setUserName }) => {
  const navigate = useNavigate();
  const [userName, setLocalUserName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (userName.trim() === "") {
      alert("Name cannot be empty.");
      return;
    }

    localStorage.setItem("userName", userName);
    setUserName(userName);
    navigate("/", { replace: true });
  }

  return (
    <div className={styles.setupContainer}>
      <header>
        <h2 className={styles.title}>Setup Page</h2>
      </header>

      <div className={styles.setupFormContainer}>
        <form className={styles.setupForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.labelName}>Name</label>

                <input
                    value={userName}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name goes here..."
                    onChange={(e) => setLocalUserName(e.target.value)}
                    maxLength={20}
                    className={styles.inputName}
                />
            </div>

          <button type="submit" className={styles.submitBtn}>
            <img
              src={`${import.meta.env.BASE_URL}img/right-arrow.png`}
              alt="Right arrow"
              className={styles.arrowIcon}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setup;
