import React from 'react';
import TeachersQuestion from '../components/TeachersQuestion';
import routes from '../constants/routes.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import Navbar from '../components/Navbar.jsx';

function App() {
  const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  if (userId) {
    return (
      <>
      <Navbar/>
      <div>
        <TeachersQuestion
          content="Opettajan kysymys"
          color="black"
          backgroundColor="lightgray"
          userId={userId}
        />
        {/* <button className="logout-button" onClick={logout}>Kirjaudu ulos</button> */}
      </div>
      </>

    );
  } else {
    window.location.href = routes.login;
  }
}

export default App;
