export const getSlots = (geofences) => {
  let slots = "";
  if(geofences.length === 1){
    return geofences[0].slot + 1;
  } else {
    for (let i = 0; i < geofences.length; i++) {
      if (i === geofences.length - 1) {
        slots += `${geofences[i].slot + 1}`;
      } else {
        slots += `${geofences[i].slot + 1}, `;
      }
    }
    return slots;
  }
}