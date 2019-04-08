/* eslint-disable react/display-name */
import React from 'react'

export default props => {
  const { id, name, AC, dex_modifier, max_HP, player_name, initiative } = props.character
  const isDM = props.isDM
  const finishTurn = props.finishTurn
  const removeCharacter = props.removeCharacter

  return (
    <tr>
      <td>
        {isDM ? (
          <div className="text-center">
            <div className="btn-group">
              <button onClick={() => finishTurn(id)} className="btn-sm btn-success" type="button">
                &#10003;
              </button>
              {player_name === 'DM' ? (
                <button aria-label="Close" className="close" onClick={() => removeCharacter(id)} type="button">
                  <span aria-hidden="true">&times;</span>
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </td>
      <td>{name}</td>
      <td>{isDM ? AC : ''}</td>
      <td>{isDM ? dex_modifier : ''}</td>
      <td>{isDM ? max_HP : ''}</td>
      <td>{player_name}</td>
      <td>{initiative ? initiative : ''}</td>
    </tr>
  )
}
