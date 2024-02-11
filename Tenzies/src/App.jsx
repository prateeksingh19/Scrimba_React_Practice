import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [dice, setDice] = useState(createNewDie());

  const [tenzies, setTenzies] = useState(false);

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
      newDie.push(generateNewDie());
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
    } else {
      setTenzies(false);
      setDice(createNewDie);
    }
  }

  function holdDice(id) {
    setDice((oldDie) =>
      oldDie.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
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
      </div>
    </main>
  );
}
