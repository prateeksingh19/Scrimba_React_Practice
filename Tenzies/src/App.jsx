import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [dice, setDice] = useState(createNewDie());

  const [rolls, setRolls] = useState(0);

  const [time, setTime] = useState(0);

  const [tenzies, setTenzies] = useState(false);

  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    let timerId;
    if (timerStarted && !tenzies) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [timerStarted, tenzies]);

  useEffect(() => {
    if (tenzies) {
      const bestTime = JSON.parse(localStorage.getItem("time"));
      const parsedBestTime = !isNaN(bestTime) ? bestTime : 0;
      if (parsedBestTime > time) {
        localStorage.setItem("time", JSON.stringify(time));
      }
    }
  }, [tenzies]);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value == firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function createNewDie() {
    const newDie = [];
    for (let i = 0; i < 10; i++) {
      newDie.push({ id: nanoid(), value: 0, isHeld: false });
    }
    return newDie;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDie) =>
        oldDie.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setRolls((prevRoll) => prevRoll + 1);
      if (!timerStarted) {
        setTimerStarted(true);
      }
    } else {
      setTenzies(false);
      setDice(createNewDie);
      setRolls(0);
      setTime(0);
      setTimerStarted(false);
    }
  }

  function holdDice(id) {
    if (timerStarted) {
      setDice((oldDie) =>
        oldDie.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    } else {
      alert("Please roll the dice first to start the game!");
    }
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <div className="innerDiv">
        {tenzies && <Confetti />}
        <h2 className="title">Tenzies</h2>
        <p className="subtitle">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die_container">{diceElements}</div>
        <button onClick={rollDice} className="rollDice">
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className="stats">
          <p>{`No. of Rolls: ${rolls}`}</p>
          <p>{`Time taken: ${time}`}</p>
          <p>{`Best Time: ${JSON.parse(localStorage.getItem("time")) || 0}`}</p>
        </div>
      </div>
    </main>
  );
}
