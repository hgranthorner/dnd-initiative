import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import axios from 'axios'

const initialState = {
  roomId: 0,
  rooms: [],
  isDM: false,
  characterId: 0,
  characters: [],
  inCombat: false
}

// action types
const GET_ROOMS = Symbol('redux get rooms')
const ADD_ROOM = Symbol('redux add rooms')
const CHOOSE_ROOM = Symbol('redux choose room')
const DELETE_ROOM = Symbol('redux delete room')
const GET_CHARACTERS = Symbol('redux get characters')
const ADD_CHARACTER = Symbol('redux add character')
const CHOOSE_CHARACTER = Symbol('redux choose character')
const DELETE_CHARACTER = Symbol('redux delete character')
const TOGGLE_COMBAT = Symbol('redux toggle combat')
const TOGGLE_DM = Symbol('redux toggle DM')

// action creators

const getRoomsActionCreator = (rooms) => ({ type: GET_ROOMS, rooms })
const addRoomActionCreator = (room) => ({ type: ADD_ROOM, room })
const chooseRoomActionCreator = (roomId) => ({ type: CHOOSE_ROOM, roomId })
const deleteRoomActionCreator = (roomId) => ({ type: DELETE_ROOM, roomId })
const getCharactersActionCreator = (characters) => ({ type: GET_CHARACTERS, characters })
const addCharacterActionCreator = (character) => ({ type: ADD_CHARACTER, character })
const chooseCharacterActionCreator = (characterId) => ({ type: CHOOSE_CHARACTER, characterId })
const deleteCharacterActionCreator = (characterId) => ({ type: DELETE_CHARACTER, characterId })
const toggleCombatActionCreator = () => ({ type: TOGGLE_COMBAT })
const toggleDMActionCreator = () => ({ type: TOGGLE_DM })

// reducer

const reducer = (state = initialState, { type, rooms, room, roomId, character, characters, characterId }) => {
  switch(type) {
    case GET_ROOMS:
      return { ...state, rooms }
    case ADD_ROOM:
      return { ...state, rooms: [...state.rooms, room] }
    case CHOOSE_ROOM:
      console.log('new roomId:', roomId)
      return { ...state, roomId }
    case DELETE_ROOM:
      const oldRooms = [...state.rooms]
      const newRooms = oldRooms.filter(r => Number(r.id) !== Number(roomId))
      return { ...state, rooms: newRooms }
    case GET_CHARACTERS:
      return { ...state, characters }
    case ADD_CHARACTER:
      return { ...state, characters: [...state.characters, character] }
    case CHOOSE_CHARACTER:
      return { ...state, characterId }
    case DELETE_CHARACTER:
      const oldCharacters = [...state.characters]
      const newCharacters = oldCharacters.filter(c => Number(c.id) !== Number(characterId))
      return { ...state, characters: newCharacters }
    case TOGGLE_COMBAT:
      return { ...state, inCombat: !state.inCombat }
    case TOGGLE_DM:
      return { ...state, isDM: !state.isDM }
    default:
      return state
  }
}

// store

const store = createStore(reducer, applyMiddleware(thunk))

// thunks

const getRooms = () => {
  return dispatch => {
    return axios.get('/api/rooms')
      .then(res => res.data)
      .then(rooms => {
        dispatch(getRoomsActionCreator(rooms))
        }
      )
  }
}

const addRoom = (room) => {
  return dispatch => {
    return axios.post('/api/room', { room })
      .then(() =>
        dispatch(addRoomActionCreator(room))
      )
  }
}

const deleteRoom = (roomId) => {
  return dispatch => {
    return axios.delete(`/api/room/${roomId}`)
      .then(() =>
        dispatch(deleteRoomActionCreator(roomId))
      )
  }
}

const getCharacters = (roomId) => {
  return dispatch => {
    return axios.get(`/api/rooms/${roomId}`)
      .then(res => res.data)
      .then(characters =>
        dispatch(getCharactersActionCreator(characters))
      )
  }
}


const addCharacter = (character) => {
  return dispatch => {
    return axios.add('/api/character', { character })
      .then(() =>
        dispatch(addCharacterActionCreator(character))
      )
  }
}

const deleteCharacter = (characterId) => {
  return dispatch => {
    return axios.delete(`/api/character/${characterId}`)
      .then(() =>
        dispatch(deleteCharacterActionCreator(characterId))
      )
  }
}

export { store, getRooms, getCharacters,
  getCharactersActionCreator, toggleDMActionCreator,
  addRoom, addCharacter, deleteRoom,
  deleteCharacter, chooseRoomActionCreator,
  chooseCharacterActionCreator, toggleCombatActionCreator }