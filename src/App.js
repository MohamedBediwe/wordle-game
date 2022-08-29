import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import axios from "axios";

function App() {
  const [solution, setSolution] = useState(null);

  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getRandom",
    params: { wordLength: "5" },
    headers: {
      "X-RapidAPI-Key": "6c5427a766msh7d99d27c367b963p1f767djsnca52a709d6de",
      "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    axios
      .request(options)
      .then(function (response) {
        setSolution(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
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
