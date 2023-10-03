import './dashboard.css';
import React, { useEffect, useState } from 'react';
import TeachersQuestion from '../components/TeachersQuestion';
import routes from '../constants/routes.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import Navbar from '../components/Navbar.jsx';
import SessionList from '../components/SessionList.jsx';
import { BASE_URL, ENDPOINTS } from '../constants/api';

export default function Dashboard() {
  const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);
  const [data, setData] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const fetchedData = await (
        await fetch(`${BASE_URL}/${ENDPOINTS.session}?teacher_id=${userId}`)
      ).json();

      setData(fetchedData.results);
    };

    dataFetch();
  }, [userId]);

  if (!userId) {
    window.location.href = routes.login;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <TeachersQuestion
          content="Opettajan kysymys"
          color="black"
          backgroundColor="lightgray"
          userId={userId}
        />
        <SessionList data={data} />
      </div>
    </>
  );
}
