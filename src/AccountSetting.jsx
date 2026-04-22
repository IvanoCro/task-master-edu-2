import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Account.module.css";

const AccountSetting = ({ setUserName }) => {
  const [userName, setLocalUserName] = useState("");
  const [usernameChanged, setUsernameChanged] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();

    if (userName.trim() === "") {
      alert("Name cannot be empty.");
      return;
    }

    localStorage.setItem("userName", userName);
    setUserName(userName);
    setLocalUserName("");
    setUsernameChanged(true);
  }

  useEffect(() => {
    if (!usernameChanged) return;

    const timer = setTimeout(() => {
      setUsernameChanged(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [usernameChanged]);

  return (
    <div className={styles.wrapper}>
      <header>
        <h2 className={styles.title}>Account</h2>
      </header>

      <main>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name</label>

          <input
            type="text"
            name="name"
            value={userName}
            onChange={(e) => setLocalUserName(e.target.value)}
            placeholder="Your name goes here"
            maxLength={20}
            className={`${styles.input} ${
              usernameChanged ? styles.success : ""
            }`}
          />

          {usernameChanged && (
            <p className={styles.successText}>Username changed!</p>
          )}

          <button type="submit" className={styles.changeBtn}>Change</button>
        </form>

        <Link className={styles.backButton} to="/settings">
          Back
        </Link>
      </main>
    </div>
  );
};

export default AccountSetting;
