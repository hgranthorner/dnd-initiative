import { Room, Character } from './@types'
// action types
export const GET_ROOMS = Symbol('redux get rooms')
export const ADD_ROOM = Symbol('redux add rooms')
export const CHOOSE_ROOM = Symbol('redux choose room')
export const DELETE_ROOM = Symbol('redux delete room')
export const GET_CHARACTERS = Symbol('redux get characters')
export const ADD_CHARACTER = Symbol('redux add character')
export const CHOOSE_CHARACTER = Symbol('redux choose character')
export const DELETE_CHARACTER = Symbol('redux delete character')
export const TOGGLE_COMBAT = Symbol('redux toggle combat')
export const TOGGLE_DM = Symbol('redux toggle DM')

// action creators
export const getRoomsActionCreator = (rooms: Array<Room>) => ({ type: GET_ROOMS, rooms })
export const addRoomActionCreator = (room: Room) => ({ type: ADD_ROOM, room })
export const chooseRoomActionCreator = (roomId: number) => ({ type: CHOOSE_ROOM, roomId })
export const deleteRoomActionCreator = (roomId: number) => ({ type: DELETE_ROOM, roomId })
export const getCharactersActionCreator = (characters: Array<Character>) => ({ type: GET_CHARACTERS, characters })
export const addCharacterActionCreator = (character: Character) => ({ type: ADD_CHARACTER, character })
export const chooseCharacterActionCreator = (characterId: number) => ({ type: CHOOSE_CHARACTER, characterId })
export const deleteCharacterActionCreator = (characterId: number) => ({ type: DELETE_CHARACTER, characterId })
export const toggleCombatActionCreator = () => ({ type: TOGGLE_COMBAT })
export const toggleDMActionCreator = () => ({ type: TOGGLE_DM })
