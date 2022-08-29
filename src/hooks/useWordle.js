import { useState } from "react";

const useWordle = (solution, fetchData) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const [warning, setWarning] = useState("");

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((e) => ({
      key: e,
      color: "grey",
    }));

    // find green letters
    formattedGuess.forEach((e, i) => {
      if (solutionArray[i] === e.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // find yellow letters
    formattedGuess.forEach((e, i) => {
      if (solutionArray.includes(e.key) && e.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(e.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prev) => [...prev, currentGuess]);
    setTurn((prev) => prev + 1);
    setUsedKeys((prev) => {
      let newKeys = { ...prev };
      formattedGuess.forEach((e) => {
        const currentColor = newKeys[e.key];
        if (e.color === "green") {
          newKeys[e.key] = "green";
          return;
        }
        if (e.color === "yellow" && currentColor !== "green") {
          newKeys[e.key] = "yellow";
          return;
        }
        if (
          e.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[e.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      // adding the guess if only the turn is less than 5
      if (turn > 5) {
        console.log("u used all of ur guesses");
        setWarning("")
        return;
      }
      // not accepting the same word twice
      if (history.includes(currentGuess)) {
        console.log("u already tried that word");
        setWarning("same guess")
        return;
      }
      // checks if the guess has 5 chars
      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars long");
        return;
      }
      let formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    } else if (key === "Backspace") {
      if (currentGuess.length > 0) {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }
    }
  };

  const resetGame = () => {
    setTurn(0);
    setHistory([]);
    setCurrentGuess("");
    setGuesses([...Array(6)]);
    setUsedKeys({});
    setIsCorrect(false);
    fetchData();
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyUp,
    resetGame,
  };
};

export default useWordle;
