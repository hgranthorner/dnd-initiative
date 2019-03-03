/* eslint-disable react/display-name */
import React from 'react'

export default props => {
  const { id, name, AC, dex_modifier, max_HP, player_name, initiative } = props.character
  const finishTurn = props.finishTurn
  return (
    <tr>
      <td>
        <button onClick={() => finishTurn(id)} className="btn btn-primary">
          Done
        </button>
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
