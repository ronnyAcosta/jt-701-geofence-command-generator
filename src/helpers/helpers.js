const copyContent = (e) => {
  const content = e.target.parentNode.innerText;
  navigator.clipboard.writeText(content)
  .then(() =>{
    document.getElementById("copied").classList.add('visible');
  })
  .then( () =>{
    setTimeout(() =>{
      document.getElementById("copied").classList.remove('visible');
    }, 1000)
  }).catch("Error at reading content");
}

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

export {copyContent, coordinatesFormatConverter}