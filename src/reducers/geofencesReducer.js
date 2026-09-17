import { actionType } from "../types/actionType";

export const geofencesReducer = (geofences = [], action) => {
  switch (action.type) {

    case actionType.add: {
      // Place the new geofence at its assigned slot instead of appending,
      // so previously freed slots (from deletions) are reused first.
      const updated = [...geofences];
      updated[action.payload.slot] = action.payload;
      return updated;
    }

    case actionType.edit: {
      // Update coordinates for the edited geofences by docId, skipping
      // empty slots (null) left behind by deletions.
      return geofences.map((geofence) => {
        if (!geofence) return geofence;
        const edited = action.payload.find((g) => g.docId === geofence.docId);
        return edited ? { ...geofence, coordinates: edited.coordinates } : geofence;
      });
    }

    case actionType.delete: {
      // Leave a null in place of the deleted geofence instead of removing
      // it from the array, so the remaining geofences keep their index
      // (and therefore their P29 command slot number).
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
