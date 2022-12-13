let roomInfo = {
    'singleRoom':{
        selectedRoom:0,
        roomCost:800
    },
    "doubleRoom":{
        selectedRoom:0,
        roomCost:900
    },
    "LuxuryRoom":{
        selectedRoom:0,
        roomCost:1200
    }
}

console.log(roomInfo['singleRoom']['selectedRoom'])

roomInfo['singleRoom']['selectedRoom'] = 10;
console.log(roomInfo['singleRoom']['selectedRoom'])


