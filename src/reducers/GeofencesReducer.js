import { actionType } from "../types/actionType";

export const geofencesReducer = (geofences = [], action) => {
  switch (action.type) {
    case actionType.add:
      return [...geofences, action.payload];

    case actionType.edit:
      geofences.map((geofence) => {
        return action.payload.map((edit) => {
          if (geofence._id === edit._id) {
            geofence.coordinates = edit.coordinates;
          }
          return 0;
        });
      });
      return [...geofences];

    case actionType.delete:
      return geofences.filter((actual) => !action.payload.includes(actual._id));

    /* case actionType.clear:  // Usar Luego que esté creada la base de datos
      return [] */
    default:
      return geofences;
  }
};
