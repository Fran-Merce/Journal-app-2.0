import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import { login, loguot } from "../store/auth";

export const useCheckingAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);


  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async user => {
      if (!user) return dispatch(loguot());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  return  status 

};