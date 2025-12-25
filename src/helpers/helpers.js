const showMessage = (element) =>{
  try{
    if (element !== '#copied') document.querySelector(element).style.display = 'block';

    setTimeout(()=>{
      document.querySelector(element) && document.querySelector(element).classList.add('visible');
    }, 10);
    
    setTimeout(()=>{
      document.querySelector(element) && document.querySelector(element).classList.remove('visible');
    }, 2000);

    setTimeout(()=>{
      if(document.querySelector(element) && element !== '#copied') { document.querySelector(element).style.display = 'none'; }  
    }, 2500);
  } catch(err){
    console.log("An error occurred showing the message");
  }
}

const copyContent = (e) => {
  const content = e.target.parentNode.innerText;
  navigator.clipboard.writeText(content).then(() => showMessage("#copied") )
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
