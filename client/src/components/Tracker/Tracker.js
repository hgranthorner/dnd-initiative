import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { getCharacters, getCharactersActionCreator } from "../../store"
import TrackerInput from './TrackerInput'
import TrackerHeader from './TrackerHeader'
import Character from './Character'

const mapStateToProps = ({ isDM, characters }) => {
  console.log(characters)
  return { isDM, characters }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCharacters: (characters) => dispatch(getCharactersActionCreator(characters)),
    getCharacters: (roomId) => dispatch(getCharacters(roomId))
  }
}

const Tracker = ({ roomId, updateCharacters, isDM, getCharacters, characters }) => {
  useEffect(() => {
    getCharacters(roomId)
  }, [])


  const finishTurn = id => {
    console.log('finish turn')
    const char = characters.find(c => c.id === id)
    const newCharacters = characters.filter(c => c.id !== id)
    newCharacters.push(char)
    updateCharacters(newCharacters)
  }

  return (
    <div>
      <TrackerHeader characters={characters} isDM={isDM}/>
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
          <Character key={character.id}
                     character={character}
                     isDM={isDM}
                     finishTurn={() => finishTurn(character.id)}
          />
        ))}
        {isDM ? (
          <TrackerInput/>
        ) : (
          null
        )}
        </tbody>
      </table>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker)