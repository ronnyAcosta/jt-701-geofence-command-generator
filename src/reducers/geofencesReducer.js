import { actionType } from "../types/actionType";

export const geofencesReducer = (geofences = [], action) => {
  switch (action.type) {
    
    case actionType.add:
      return [...geofences, action.payload];

    case actionType.edit:
      geofences.map((geofence) => {
        return action.payload.map((edit) => {
          if (geofence.docId === edit.docId) {
            geofence.coordinates = edit.coordinates;
          }
          return 0;
        });
      });
      return [...geofences];

    case actionType.delete:
      return geofences.filter((geofence) => !action.payload.some((g) => g.docId === geofence.docId));

    case actionType.load:
      return action.payload;

    case actionType.clear:
      return [];
    
    default:
      return geofences;
  }
};
