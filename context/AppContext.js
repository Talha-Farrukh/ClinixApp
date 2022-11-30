//create a context api for user
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { db } from "../api/firebase";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const drawer = useRef(null);
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((v) => (v ? setUser(JSON.parse(v)) : setUser()))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
    // AsyncStorage.getItem("userDoc")
    //   .then((v) => (v ? setUserDoc(JSON.parse(v)) : setUserDoc()))
    //   .then(() => setIsLoading(false))
    //   .catch((e) => console.log(e));

    if (user) {
      const docRef = doc(db, "Users", user);
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserDoc(snapshot.data());
            setIsLoading(false);
          } else {
            setUser(null);
            setUserDoc(null);
            AsyncStorage.removeItem("user");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        userDoc,
        setUserDoc,
        isLoading,
        setIsLoading,
        drawer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const AppState = () => {
  return useContext(AppContext);
};
