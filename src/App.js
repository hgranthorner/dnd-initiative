import React from 'react'
import axios from 'axios'
import Character from './Character'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      characters: [],
      selectedCharId: -1,
      combatStarted: false
    }

    this.selectCharacter = this.selectCharacter.bind(this)
    this.toggleCombat = this.toggleCombat.bind(this)
    this.finishTurn = this.finishTurn.bind(this)
  }

  toggleCombat() {
    this.setState(prevState => {
      prevState.characters.forEach(character => {
        character.initiative = !prevState.combatStarted ? Math.floor(Math.random() * 20) + character.dex_modifier : 0
      })
      return {
        combatStarted: !prevState.combatStarted,
        characters: prevState.characters.sort((a, b) => {
          return a.initiative < b.initiative ? 1 : -1
        })
      }
    })
  }

  componentDidMount() {
    axios
      .get('/api/characters')
      .then(response => response.data)
      .then(characters => this.setState({ characters }))
      .catch(e => console.error(`Failed to obtain characters from db.\n${3}`))
  }

  selectCharacter(id) {
    console.log(id)
    this.setState({ selectedCharId: id })
  }

  finishTurn(id) {
    console.log('finish turn')
    this.setState(prevState => {
      const char = prevState.characters.find(c => c.id === id)
      const newCharacters = prevState.characters.filter(c => c.id !== id)
      newCharacters.push(char)
      return {
        characters: newCharacters
      }
    })
  }

  render() {
    const { characters, combatStarted, selectedCharId } = this.state
    console.log(characters)
    return (
      <div>
        <h1>DnD Initiative Tracker</h1>
        <button onClick={() => this.toggleCombat()} className="btn btn-primary">
          {combatStarted ? 'End Combat' : 'Begin Combat'}
        </button>
        <table className="table">
          <thead>
            <tr>
              <td />
              <td>Character Name</td>
              <td>AC</td>
              <td>DEX Modifier</td>
              <td>Max HP</td>
              <td>Player Name</td>
              <td>Initiative</td>
            </tr>
          </thead>
          <tbody>
            {characters.map(character => (
              <Character key={character.id} character={character} finishTurn={this.finishTurn} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
