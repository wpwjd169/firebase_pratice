import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  let [init, setInit] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        // setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),

        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  let refreshUser = () => {
    let user = authService.currentUser;
    //setUserObj(Object.assign({}, user));
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),

    });
  }
  return (
    <>
      {init ? <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)}
        userObj={userObj} /> : "Initializing...."}
    </>
  );
}

export default App;
