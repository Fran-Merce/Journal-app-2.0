import {onAuthStateChanged} from "firebase/auth";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {firebaseAuth} from "../firebase/config";
import {login, logout} from "../store/auth";
import {startLoadingNotes} from "../store/journal";

export const useCheckingAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async user => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;

      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingNotes());
    });
  }, []);
  return status;
};
