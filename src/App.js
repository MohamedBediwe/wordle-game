import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);
  const fetchData = async () => {
    const res = await fetch("http://localhost:3001/solutions");
    const data = await res.json();
    setSolution(data[Math.floor(Math.random() * data.length)].word);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} fetchData={fetchData} />}
    </div>
  );
}

export default App;
