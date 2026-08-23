import { centerPointSetterType } from "../types/centerPointSetterType";

export const centerPointSetterReducer = (centerPoint = {}, action) => {
  switch (action.type) {
    
    case centerPointSetterType.set:
      return action.payload;

    case centerPointSetterType.edit:
      return action.payload;

    // case centerPointSetterType.delete:
    //   return centerPoint.filter((geofence) => !action.payload.some((g) => g._id === geofence._id || coordinatesAreEqual(g.coordinates, geofence.coordinates)));

    // case centerPointSetterType.load:
    //   return action.payload;

    case centerPointSetterType.clear:
      return {};
    
    default:
      return centerPoint;
  }
};
