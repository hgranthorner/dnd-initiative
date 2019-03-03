/* eslint-disable react/display-name */
import React from 'react'

export default props => {
  const { id, name, AC, dex_modifier, max_HP, player_name, initiative } = props.character
  const finishTurn = props.finishTurn
  const removeCharacter = props.removeCharacter
  return (
    <tr>
      <td>
        <button onClick={() => finishTurn(id)} className="btn btn-primary">
          Done
        </button>
        {player_name === 'DM' ? (
          <button className="btn btn-danger" onClick={() => removeCharacter(id)}>
            Remove
          </button>
        ) : (
          ''
        )}
      </td>
      <td>{name}</td>
      <td>{AC}</td>
      <td>{dex_modifier}</td>
      <td>{max_HP}</td>
      <td>{player_name}</td>
      <td>{initiative ? initiative : ''}</td>
    </tr>
  )
}
