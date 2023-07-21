let data = "18.468442121013613,-69.93175128339988";

let coordinate = data.split(",");
let lat = coordinate[0].split(".");
let lon = coordinate[1].split(".");

let mmLat = (Number(`0.${lat[1]}`)*60).toFixed(4);
let mmLon = (Number(`0.${lon[1]}`)*60).toFixed(4);

let convCoordinate = `${lon[0]}${mmLon},${lat[0]}${mmLat}`

console.log(convCoordinate)