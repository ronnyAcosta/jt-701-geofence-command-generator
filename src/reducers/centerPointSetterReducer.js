import { centerPointSetterType } from "../types/centerPointSetterType";
import { DEFAULT_CENTER_POINT } from "../actions/centerPointSetterAction";
export const centerPointSetterReducer = (centerPoint = {}, action) => {
  switch (action.type) {
    
    case centerPointSetterType.set:
      return action.payload;

    case centerPointSetterType.edit:
      return action.payload;

    case centerPointSetterType.default:
      return DEFAULT_CENTER_POINT;

    case centerPointSetterType.load:
      return action.payload;

    case centerPointSetterType.clear:
      return {};
    
    default:
      return centerPoint;
  }
};
