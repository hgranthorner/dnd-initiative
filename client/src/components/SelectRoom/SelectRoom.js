import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { getRooms, chooseRoomActionCreator, addRoom } from '../../store'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ rooms }) => {
  return { rooms }
}

const mapDispatchToProps = dispatch => {
  return {
    getRooms: () => dispatch(getRooms()),
    chooseRoom: (roomId) => dispatch(chooseRoomActionCreator(roomId)),
    addRoom: (room) => dispatch(addRoom(room))
  }
}

const SelectRoom = ({ rooms, getRooms, chooseRoom, addRoom }) => {
  useEffect(() => {
    getRooms()
  }, [])

  return (
    <div>
      <h3>Select a room:</h3>
      <ul className="list-group" style={{marginBottom: '10px'}}>
        {
          rooms.map(room => (
              <Link to={'/characters'}
                    key={room.id}
                    onClick={() => chooseRoom(room.id)}>
                <li className="list-group-item" style={{cursor: 'pointer'}}>
                  {room.name}
                </li>
              </Link>
            )
          )
        }
      </ul>
      <button type={'button'} className={'btn btn-primary'}>Add Room</button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectRoom)