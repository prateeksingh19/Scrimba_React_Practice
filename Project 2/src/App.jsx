import NavBar from './Components/NavBar'
import Hero from './Components/Hero'
import Card from './Components/Card'
import './App.css'
import data from './Data'

function App() {
  const cards = data.map( item =>{
    return (<Card 
      key={item.id}
      {...item}
    />)
  })
  return (
    <>
      <NavBar/>
      <Hero />
      <section className="cards_list">
        {cards}
      </section>
    </>
  )
}

export default App
