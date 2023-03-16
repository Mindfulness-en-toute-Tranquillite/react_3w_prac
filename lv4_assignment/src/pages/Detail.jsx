import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function Detail() {
  const [logs, setLogs] = useState(null);

  const fetchLogs = async () => {
    const { data } = await axios.get('http://localhost:4000/logs');
    console.log('data', data)
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs()
  }, []);


  const navigate = useNavigate();
  const params = useParams();
  console.log("params", params)
  // const logs = useSelector((state) => state.logs);
  // console.log("logs", logs)
  // console.log("id", logs.id)
  return (
    // <>
    // <div>{logs.id}</div>

    // <div>{logs.title}</div>
    // <div>{logs.content}</div>
    // </>
      <>
        <button
        onClick={()=>{navigate('/')}}>이전으로</button>
        <div>
          {logs?.map((item) => {
            return (
              <div key={item.id}>
                {item.id} : {item.title}
              </div>
            );
          })}
        </div>
      </>
  )
}

export default Detail