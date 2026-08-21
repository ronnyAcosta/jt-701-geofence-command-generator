const coordinatesFormatConverter = (coordinate) =>{
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

const coordinatesAreEqual = (cords1, cods2) => {
  if (cords1.length !== cods2.length) return false;

  return cords1.every((coord1, index) => {
    const coord2 = cods2[index];
    return coord1.lat === coord2.lat && coord1.lng === coord2.lng;
  });
}

export {coordinatesFormatConverter, coordinatesAreEqual}
