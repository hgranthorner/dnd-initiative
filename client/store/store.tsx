import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import { Room, Character, state, action } from './@types'
import {
  ADD_CHARACTER, ADD_ROOM, chooseCharacterActionCreator, chooseRoomActionCreator,
  addCharacterActionCreator, addRoomActionCreator, CHOOSE_CHARACTER, toggleDMActionCreator,
  CHOOSE_ROOM, DELETE_CHARACTER, DELETE_ROOM, deleteCharacterActionCreator, deleteRoomActionCreator, GET_CHARACTERS,
  GET_ROOMS, getCharactersActionCreator, getRoomsActionCreator, TOGGLE_COMBAT, TOGGLE_DM, toggleCombatActionCreator
} from './actions'

const initialState: state = {
  roomId: 0,
  rooms: [],
  isDM: false,
  characterId: 0,
  characters: [],
  inCombat: false
}


// reducer

const reducer = (state = initialState, action: action) => {
  switch (action.type) {
    case GET_ROOMS:
      return { ...state, rooms: action.rooms }
    case ADD_ROOM:
      return { ...state, rooms: [...state.rooms, action.room] }
    case CHOOSE_ROOM:
      console.log('new roomId:', action.roomId)
      return { ...state, roomId: action.roomId }
    case DELETE_ROOM:
      const oldRooms = [...state.rooms]
      const newRooms = oldRooms.filter(r => Number(r.id) !== Number(action.roomId))
      return { ...state, rooms: newRooms }
    case GET_CHARACTERS:
      return { ...state, characters: action.characters }
    case ADD_CHARACTER:
      return { ...state, characters: [...state.characters, action.character] }
    case CHOOSE_CHARACTER:
      return { ...state, characterId: action.characterId }
    case DELETE_CHARACTER:
      const oldCharacters = [...state.characters]
      const newCharacters = oldCharacters.filter(c => Number(c.id) !== Number(action.characterId))
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
  return (dispatch: any) => {
    return axios.get('/api/rooms')
      .then(res => res.data)
      .then(rooms => {
          dispatch(getRoomsActionCreator(rooms))
        }
      )
  }
}

const addRoom = (room: Room) => {
  return (dispatch: any) => {
    return axios.post('/api/room', { room })
      .then(() =>
        dispatch(addRoomActionCreator(room))
      )
  }
}

const deleteRoom = (roomId: number) => {
  return (dispatch: any) => {
    return axios.delete(`/api/room/${roomId}`)
      .then(() =>
        dispatch(deleteRoomActionCreator(roomId))
      )
  }
}

const getCharacters = (roomId: number) => {
  return (dispatch: any) => {
    return axios.get(`/api/rooms/${roomId}`)
      .then(res => res.data)
      .then(characters =>
        dispatch(getCharactersActionCreator(characters))
      )
  }
}


const addCharacter = (character: Character) => {
  return (dispatch: any) => {
    return axios.post('/api/character', { character })
      .then(() =>
        dispatch(addCharacterActionCreator(character))
      )
  }
}

const deleteCharacter = (characterId: number) => {
  return (dispatch: any) => {
    return axios.delete(`/api/character/${characterId}`)
      .then(() =>
        dispatch(deleteCharacterActionCreator(characterId))
      )
  }
}

export {
  store, getRooms, getCharacters,
  getCharactersActionCreator, toggleCombatActionCreator,
  addRoom, addCharacter, deleteRoom,
  deleteCharacter, chooseCharacterActionCreator,
  chooseRoomActionCreator, toggleDMActionCreator
}