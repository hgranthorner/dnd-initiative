export interface Room {
  id: number,
  name: string,
  inCombat: boolean
}

export interface Character {
  id: number,
  player_name: string,
  name: string,
  dex_modifier: number,
  AC: number,
  max_HP: number,
  initiative: number
}

export interface state {
  roomId: number,
  rooms: Array<Room>,
  isDM: boolean,
  characterId: number,
  characters: Array<Character>,
  inCombat: boolean
}

export interface action {
  type: symbol,
  rooms: Array<Room>,
  room: Room,
  roomId: number,
  characters: Array<Character>,
  character: Character,
  characterId: number
}