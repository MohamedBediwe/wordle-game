import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null);
  useEffect(() => {
    const fetchLetters = async () => {
      const res = await fetch("http://localhost:3001/letters");
      const data = await res.json();
      setLetters(data);
    };
    fetchLetters();
  }, []);
  return (
    <div className="keypad">
      {letters &&
        letters.map((e) => {
          const color = usedKeys[e.key];
          return (
            <div key={e.key} className={color}>
              {e.key}
            </div>
          );
        })}
    </div>
  );
}
