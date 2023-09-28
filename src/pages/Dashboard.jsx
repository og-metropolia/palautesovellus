import React from 'react';
import TeachersQuestion from '../components/TeachersQuestion';
import routes from '../constants/routes.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';

function App() {
  const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  if (userId) {
    return (
      <div>
        <TeachersQuestion
          content="Opettajan kysymys"
          color="black"
          backgroundColor="lightgray"
          userId={userId}
        />
      </div>
    );
  } else {
    window.location.href = routes.login;
  }
}

export default App;
