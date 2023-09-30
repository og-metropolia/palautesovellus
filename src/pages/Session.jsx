import { BASE_URL, ENDPOINTS } from '../constants/api';
import React, { useState, useEffect } from 'react';

export default function Session(props) {
  const [data, setData] = useState();
  const id = props.match.params.id;

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(`${BASE_URL}/${ENDPOINTS.question}?session_id=${id}`)
      ).json();

      setData(data);
    };

    dataFetch();
  }, []);

  return (
    <>
      {data &&
        data.questions.map((question) => {
          return <p>{JSON.stringify(question)}</p>;
        })}
    </>
  );
}
