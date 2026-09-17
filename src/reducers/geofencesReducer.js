import { actionType } from "../types/actionType";

export const geofencesReducer = (geofences = [], action) => {
  switch (action.type) {

    case actionType.add: {
      const updated = [...geofences];
      updated[action.payload.slot] = action.payload;
      return updated;
    }

    case actionType.edit: {
      return geofences.map((geofence) => {
        if (!geofence) return geofence;
        const edited = action.payload.find((g) => g.docId === geofence.docId);
        return edited ? { ...geofence, coordinates: edited.coordinates } : geofence;
      });
    }

    case actionType.delete: {
      const updated = [...geofences];
      action.payload.forEach((deleted) => {
        const index = updated.findIndex((geofence) => geofence?.docId === deleted.docId);
        if (index !== -1) updated[index] = null;
      });
      return updated;
    }

    case actionType.load:
      return action.payload;

    case actionType.clear:
      return [];

    default:
      return geofences;
  }
};
