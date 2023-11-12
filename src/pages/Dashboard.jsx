import './dashboard.css';
import React, { useEffect, useState } from 'react';
import TeachersQuestion from '../components/TeachersQuestion';
import ROUTES from '../constants/routes.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import Navbar from '../components/Navbar.jsx';
import SessionList from '../components/SessionList.jsx';
import { BASE_URL, ENDPOINTS } from '../constants/api';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer.jsx';

export default function Dashboard() {
  const { t } = useTranslation();
  const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);
  if (!userId) {
    window.location.href = ROUTES.login;
    return null;
  }

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

  return (
    <>
      <Navbar showLoginButton={true} />
      <div className="dashboard-container">
        <TeachersQuestion
          content={t('dashboard.questionsHeading')}
          color="black"
          backgroundColor="lightgray"
          userId={userId}
        />
        <SessionList data={data} />
      </div>
      <Footer />
    </>
  );
}
