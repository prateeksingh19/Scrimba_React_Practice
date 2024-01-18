import NavBar from "./Components/NavBar";
import Card from "./Components/Card";
import "./App.css";
import data from "./data";

function App() {
  const cards = data.map((item) => {
    return <Card key={item.id} {...item} />;
  });
  return (
    <>
      <div className="innerDiv">
        <NavBar />
        <section className="cards_list">{cards}</section>
      </div>
    </>
  );
}

export default App;
