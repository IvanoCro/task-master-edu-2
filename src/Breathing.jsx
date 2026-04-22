import { useState, useEffect, useRef } from "react";
import Navigation from "./navigation";
import styles from "./Breathing.module.css";

const BreathingExercise = () => {
  const [phase, setPhase] = useState(null);
  const [guideText, setGuideText] = useState('Click "Start" to begin the exercise.');
  const [phaseTime, setPhaseTime] = useState("");

  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const breathInTimer = 4;   // seconds
  const breathHoldTimer = 2;
  const breathOutTimer = 6;

  function clearAllTimers() {
    clearTimeout(timerRef.current);
    clearInterval(countdownRef.current);
  }

  function handleBreathing() {
    clearAllTimers();
    setPhase("in");
  }

  function handleStopBreathing() {
    clearAllTimers();
    setPhase(null);
    setGuideText('Click "Start" to begin the exercise.');
    setPhaseTime("");
  }

  useEffect(() => {
    if (!phase) return;

    clearAllTimers();

    let duration = 0;

    if (phase === "in") {
      setGuideText("Breathe in");
      duration = breathInTimer;
      timerRef.current = setTimeout(() => setPhase("hold"), duration * 1000);
    }

    if (phase === "hold") {
      setGuideText("Hold your breath");
      duration = breathHoldTimer;
      timerRef.current = setTimeout(() => setPhase("out"), duration * 1000);
    }

    if (phase === "out") {
      setGuideText("Breathe out");
      duration = breathOutTimer;
      timerRef.current = setTimeout(() => setPhase("in"), duration * 1000);
    }

    // countdown
    setPhaseTime(duration);
    countdownRef.current = setInterval(() => {
      setPhaseTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return "";
        }
        return prev - 1;
      });
    }, 1000);

    return clearAllTimers;
  }, [phase]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
      <Navigation />
      </div>
      <main className={styles.breathingMainContainer}>
        <header>
          <h2 className={styles.title}>Breathing</h2>
        </header>
        <section className={styles.breathingSection}>
          <div>
            <div className={`${styles.circle} ${styles[phase]}`}></div>
          </div>

          <p className={styles.guideText}>{guideText}</p>
          <p className={styles.phaseTime}>{phaseTime}</p>

          <div className={styles.btnsContainer}>
            <button onClick={handleBreathing} className={styles.btn}>
              Start
            </button>
            <button onClick={handleStopBreathing} className={styles.btn}>
              Stop
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BreathingExercise;