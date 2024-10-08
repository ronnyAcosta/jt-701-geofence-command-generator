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

const showMessage = (element) =>{
  document.querySelector(element).style.display = 'block';

  setTimeout(()=>{
    document.querySelector(element).classList.add('visible');
  }, 10);
  
  setTimeout(()=>{
    document.querySelector(element).classList.remove('visible');
  }, 2000);

  setTimeout(()=>{
    document.querySelector(element).style.display = 'none'
  }, 2500);
}

const error = (prop) =>{
  document.querySelector(prop).previousElementSibling.style.color = 'red'
  document.querySelector(prop).style.borderBottom = '2px solid red';
  document.querySelector(prop).nextSibling.style.color = 'red';
  document.querySelector(prop).nextSibling.nextSibling.style.display = 'block';
}

const coordinatesAreEqual = (cords1, cods2) => {
  if (cords1.length !== cods2.length) return false;

  return cords1.every((coord1, index) => {
    const coord2 = cods2[index];
    return coord1.lat === coord2.lat && coord1.lng === coord2.lng;
  });
}



export {copyContent, coordinatesFormatConverter, showMessage, error, coordinatesAreEqual}
