let data = "18.468442121013613,-69.93175128339988";

let coordinate = data.split(",");
let lat = coordinate[0].split(".");
let lon = coordinate[1].split(".");

let mmLat = (Number(`0.${lat[1]}`)*60).toFixed(4);
let mmLon = (Number(`0.${lon[1]}`)*60).toFixed(4);

let convCoordinate = `${lon[0]}${mmLon},${lat[0]}${mmLat}`

console.log(convCoordinate)

let num = 19.56258122;

console.log(`Parte entera: ${Math.trunc(num)}
Parte decimal ${num - (Math.trunc(num))}`);
const coordinates = [
    {"lat":18.495177047270822,"lng":-69.92560204979671},
    {"lat":18.48573466958781,"lng":-69.9149626714864},
    {"lat":18.48182732662731,"lng":-69.92525884404476}
]
const getCommand = (coordinates, index) =>{
    let command = `(P29,1,${index},1,${coordinates.length}`;
    coordinates.map(c => {
        command += `,${ddddToDdmm(c.lng)},${ddddToDdmm(c.lat)}`;
    });
    command += ')';
    console.log(command);
    return command;
}
const ddddToDdmm = (coordinate) =>{
    coordinate = String(coordinate).split(".");
    let dec = (Number(`0.${coordinate[1]}`)*60).toFixed(4);
    if(dec < 10){
        coordinate[1] = String(`0${dec}`);
    }
    else{
        coordinate[1] = String(dec);
    }
    return `${coordinate[0]}${coordinate[1]}`
}
getCommand(coordinates, 1);

ddddToDdmm(-70.000653)