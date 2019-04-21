import React, { useState } from 'react'
import {connect} from 'react-redux'
import { addCharacter } from '../../../store/store'

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = dispatch => {
  return { addCharacter: (character) => dispatch(addCharacter(character)) }
}

const TrackerInput = ({ addCharacter }) => {
  const [character, setCharacter] = useState({
    name: '',
    AC: 0,
    dex_modifier: 0,
    max_HP: 0
  })

  return (
    <tr id="input-row">
      <td>
        <button className="btn btn-primary" onClick={() => addCharacter()} type="button">
          Add
        </button>
      </td>
      <td>
        <input className="text-input" name="name" defaultValue="Name..." id="name-input" />
      </td>
      <td>
        <input className="text-input" name="AC" defaultValue="0" id="ac-input" />
      </td>
      <td>
        <input className="text-input" name="dex_modifier" defaultValue="0" id="dex-input" />
      </td>
      <td>
        <input className="text-input" name="max_HP" defaultValue="0" id="hp-input" />
      </td>
      <td>
        <input className="text-input" name="player_name" defaultValue="DM" id="player-name-input" />
      </td>
      <td>
        <input className="text-input" name="initiative" defaultValue="0" id="initiative-input" />
      </td>
    </tr>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackerInput)