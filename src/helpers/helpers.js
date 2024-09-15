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

const errorMessage = (element) =>{
  const test = document.querySelector(element);
  console.log(test)

  document.querySelector(element).style.display = 'block';

  setTimeout(()=>{
    document.querySelector(element).classList.add('visible');
  }, 10)
  
  setTimeout(()=>{
    document.querySelector(element).classList.remove('visible');
  }, 2000)

  setTimeout(()=>{
    document.querySelector(element).style.display = 'none'
  }, 2500)
}

export {copyContent, coordinatesFormatConverter, errorMessage}
