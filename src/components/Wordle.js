import React, { useState, useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution, fetchData }) {
  const {
    currentGuess,
    handleKeyUp,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    resetGame,
  } = useWordle(solution, fetchData);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    if (isCorrect) {
      setShowModal(true);
      window.removeEventListener("keyup", handleKeyUp);
    }
    if (turn > 5) {
      setShowModal(true);
      window.removeEventListener("keyup", handleKeyUp);
    }
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  return (
    <>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          resetGame={resetGame}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
