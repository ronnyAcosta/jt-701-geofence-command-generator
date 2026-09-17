import { centerPointSetterType } from "../types/centerPointSetterType";

import { auth, db } from "../firebase/config-firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DEFAULT_CENTER_POINT = {
  coordinates: {
    lat: 26.752697611779812,
    lng: -18.96302324800705,
  },
  zoom: 2
}

const CENTER_POINT_DOC_ID = "default";

const getCenterPointDocRef = (uid) =>
  doc(db, `users/${uid}/centerPoint/${CENTER_POINT_DOC_ID}`);

const set = (data) => {
  return {
    type: centerPointSetterType.set,
    payload: data
  };
}

const edit = (data) => {
  return {
    type: centerPointSetterType.edit,
    payload: data,
  };
};

const defaultPoint = () => {
  return {
    type: centerPointSetterType.default,
  };
}

const load = (data) => {
  return {
    type: centerPointSetterType.load,
    payload: data
  }
}

const setCenterPoint = (centerPoint) => {
  return async (dispatch) => {
    const id = auth.currentUser.uid;

    await setDoc(getCenterPointDocRef(id), centerPoint);

    dispatch(set(centerPoint));
  };
};

const editCenterPoint = (centerPoint) => {
  return async (dispatch) => {
    const id = auth.currentUser.uid;

    await setDoc(getCenterPointDocRef(id), centerPoint, { merge: true });

    dispatch(edit(centerPoint))
  }
}

const deleteCenterPoint = () => {
  return async (dispatch) => {
    const id = auth.currentUser.uid;

    await setDoc(getCenterPointDocRef(id), DEFAULT_CENTER_POINT);

    dispatch(defaultPoint());
  }
};

const clearCenterPoint = () => {
  return (dispatch) => {
    dispatch({ type: centerPointSetterType.clear, });
  }
}

const loadCenterPoint = () => {
  return async (dispatch) => {
    const id = auth.currentUser.uid;

    try {
      const centerPointSnapshot = await getDoc(getCenterPointDocRef(id));

      if (centerPointSnapshot.exists()) {
        dispatch(load(centerPointSnapshot.data()));
      } else {
        await setDoc(getCenterPointDocRef(id), DEFAULT_CENTER_POINT);
        dispatch(defaultPoint());
      }
    } catch (error) {
      console.error('Error loading centerPoint:', error.code, error.message);
    }
  };
};

export { setCenterPoint, editCenterPoint, deleteCenterPoint, loadCenterPoint, clearCenterPoint, DEFAULT_CENTER_POINT };