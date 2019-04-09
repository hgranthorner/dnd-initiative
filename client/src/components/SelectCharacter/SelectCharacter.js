import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { getCharacters, chooseCharacterActionCreator, toggleDMActionCreator } from '../../store'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ characters }) => {
  return { characters }
}

const mapDispatchToProps = dispatch => {
  return {
    getCharacters: (roomId) => dispatch(getCharacters(roomId)),
    chooseCharacter: (characterId) => dispatch(chooseCharacterActionCreator(characterId)),
    chooseDM: () => dispatch(toggleDMActionCreator())
  }
}

const SelectCharacter = ({ roomId, characters, getCharacters, chooseCharacter, chooseDM }) => {
  useEffect(() => {
    getCharacters(roomId)
  }, [])

  return (
    <div>
      <h3>Select a character:</h3>
      <ul className="list-group" style={{marginBottom: '10px'}}>
        <Link to={`/rooms/${roomId}/tracker`}
              onClick={chooseDM}
        >
          <li className={"list-group-item"}
              style={{cursor: 'pointer'}}
          >
            DM
          </li>
        </Link>
        {
          characters.map(character => (
              <Link to={`/rooms/${roomId}/tracker`}
                    key={character.id}
                    onClick={() => chooseCharacter(character.id)}>
                <li className="list-group-item" style={{cursor: 'pointer'}}>
                  {character.name}
                </li>
              </Link>
            )
          )
        }
      </ul>
      <button type={'button'} className={'btn btn-primary'}>Add Player Character</button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCharacter)