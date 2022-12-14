import React from "react";

function Modal({ isCorrect, turn, solution, resetGame, setShowModal }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h2>You Win!</h2>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses :)</p>
          <button
            className="reset-btn"
            onClick={() => {
              setShowModal(false);
              resetGame();
            }}
            type="button"
          >
            reset the game
          </button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h2>Never Mind!</h2>
          <p className="solution">{solution}</p>
          <p>Better luck next time :)</p>
          <button
            className="reset-btn"
            onClick={() => {
              setShowModal(false);
              resetGame();
            }}
            type="button"
          >
            reset the game
          </button>
        </div>
      )}
    </div>
  );
}

export default Modal;
