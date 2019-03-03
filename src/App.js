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
    this.addCharacter = this.addCharacter.bind(this)
    this.removeCharacter = this.removeCharacter.bind(this)
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

  addCharacter() {
    const name = document.querySelector('#name-input')
    const ac = document.querySelector('#ac-input')
    const dex = document.querySelector('#dex-input')
    const hp = document.querySelector('#hp-input')
    axios
      .post('/api/characters', {
        name: name.value,
        AC: ac.value,
        dex_modifier: dex.value,
        max_HP: hp.value
      })
      .then(() => axios.get('/api/characters'))
      .then(response => response.data)
      .then(characters => this.setState({ characters }))
      .catch(e => console.error(e))
  }

  removeCharacter(id) {
    axios
      .delete(`/api/characters/${id}`)
      .then(() => axios.get('/api/characters'))
      .then(response => response.data)
      .then(characters => this.setState({ characters }))
      .catch(e => console.error(e))
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
              <Character key={character.id} character={character} finishTurn={this.finishTurn} removeCharacter={this.removeCharacter} />
            ))}
            <tr id="input-row">
              <td>
                <button className="btn btn-primary" onClick={() => this.addCharacter()}>
                  Add
                </button>
              </td>
              <td>
                <input name="name" defaultValue="Name" id="name-input" />
              </td>
              <td>
                <input name="AC" defaultValue="0" id="ac-input" />
              </td>
              <td>
                <input name="dex_modifier" defaultValue="0" id="dex-input" />
              </td>
              <td>
                <input name="max_HP" defaultValue="0" id="hp-input" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
