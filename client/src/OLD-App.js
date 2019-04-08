// import React, { useState, useEffect, useLayoutEffect } from 'react'
// import axios from 'axios/index'
// import Character from './Character'
// import { connect } from 'react-redux'
//
// const App = () => {
//   const [characters, setCharacters] = useState([])
//   const [selectedCharacterId, setSelectedCharacterId] = useState(-1)
//   const [combat, setCombat] = useState(false)
//   const [isDM, setDM] = useState(false)
//
//   const sortCharacters = characters => characters.sort((a, b) => (a.initiative < b.initiative ? 1 : -1))
//
//   const beginCombat = () => {
//     setCharacters(
//       sortCharacters(
//         characters.map(character => {
//           character.initiative = Math.ceil(Math.random() * 20)
//           return character
//         })
//       )
//     )
//   }
//
//   const endCombat = () => {
//     setCharacters(
//       characters.map(character => {
//         character.initiative = 0
//         return character
//       })
//     )
//   }
//
//   const toggleCombat = () => {
//     if (combat) {
//       setCombat(false)
//       endCombat()
//     } else {
//       setCombat(true)
//       beginCombat()
//     }
//   }
//
//   useLayoutEffect(() => {
//     axios
//       .get('/api/characters')
//       .then(response => response.data)
//       .then(characters => setCharacters(characters))
//       .catch(e => console.error(`Failed to obtain characters from db.\n${3}`))
//   }, [])
//
//   const selectCharacter = id => {
//     console.log(id)
//     setSelectedCharacterId(id)
//   }
//
//   const finishTurn = id => {
//     console.log('finish turn')
//     const char = characters.find(c => c.id === id)
//     const newCharacters = characters.filter(c => c.id !== id)
//     newCharacters.push(char)
//     setCharacters(newCharacters)
//   }
//
//   return (
//     <div>
//       <h1>DnD Initiative Tracker</h1>
//       <button onClick={() => toggleCombat()} className="btn btn-primary">
//         {combat ? 'End Combat' : 'Begin Combat'}
//       </button>
//       <button type="button" className={isDM ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setDM(!isDM)}>
//         DM View
//       </button>
//       <table className="table">
//         <thead>
//           <tr>
//             <td />
//             <td>Character Name</td>
//             <td>AC</td>
//             <td>DEX Modifier</td>
//             <td>Max HP</td>
//             <td>Player Name</td>
//             <td>Initiative</td>
//           </tr>
//         </thead>
//         <tbody>
//           {characters.map(character => (
//             <Character key={character.id} character={character} finishTurn={finishTurn} removeCharacter={removeCharacter} isDM={isDM} />
//           ))}
//           {isDM ? (
//             <tr id="input-row">
//               <td>
//                 <button className="btn btn-primary" onClick={() => addCharacter()} type="button">
//                   Add
//                 </button>
//               </td>
//               <td>
//                 <input name="name" defaultValue="Name..." id="name-input" />
//               </td>
//               <td>
//                 <input name="AC" defaultValue="0" id="ac-input" />
//               </td>
//               <td>
//                 <input name="dex_modifier" defaultValue="0" id="dex-input" />
//               </td>
//               <td>
//                 <input name="max_HP" defaultValue="0" id="hp-input" />
//               </td>
//             </tr>
//           ) : (
//             ''
//           )}
//         </tbody>
//       </table>
//     </div>
//   )
// }
//
// export default App
