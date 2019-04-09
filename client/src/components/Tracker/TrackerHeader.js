import React from 'react'
import {connect} from 'react-redux'
import { toggleCombatActionCreator, getCharactersActionCreator } from '../../store'

const mapStateToProps = ({ isDM, inCombat }) => {
  return { isDM, inCombat }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCombat: () => dispatch(toggleCombatActionCreator()),
    updateCharacters: (characters) => dispatch(getCharactersActionCreator(characters)),
  }
}

const TrackerHeader = ({ characters, isDM, inCombat, updateCombat, updateCharacters }) => {

  const sortCharacters = characters => characters.sort((a, b) => (a.initiative < b.initiative ? 1 : -1))
  const beginCombat = () => {
    updateCombat()
    updateCharacters(
      sortCharacters(
        characters.map(character => {
          character.initiative = Math.ceil(Math.random() * 20)
          return character
        })
      )
    )
  }
  const endCombat = () => {
    updateCombat()
    updateCharacters(
      characters.map(character => {
        character.initiative = 0
        return character
      })
    )
  }
  const toggleCombat = () => {
    inCombat ? endCombat() : beginCombat()
  }

  return (
    <div>
      <h1>DnD Initiative Tracker</h1>
      { isDM ?
        <button onClick={() => toggleCombat()}
                className="btn btn-primary"
                style={{marginBottom: '10px'}}
        >
          {inCombat ? 'End Combat' : 'Begin Combat'}
        </button>
        : null }
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackerHeader)