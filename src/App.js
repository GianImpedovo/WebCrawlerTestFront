import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


let page = 1

function App() {
  const [data, setData] = useState([])

  const getWordData = async () => {
      const result = await axios.get(`http://localhost:8080/words?page=${page}`)
      setData(result.data.docs);
  }

  useEffect(() => {
    // loadFirstPage()
    getWordData();

  }, []);

  const handleMas = async() => {

      page += 1;
      console.log(page);
      const result = await axios.get(`http://localhost:8080/words?page=${page}`)

      if(result.data.totalPages >= page){
        setData(prevData => [...prevData, ...result.data.docs]);
      }

  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="App">
      <div className='container'>
      {
        data.map( word => (
            <p style={{fontSize: `${word.quantity * 20}px`, margin: '0 20px'}}>{word._id}</p>
        ))
      }
      </div>
      <div className='container'>
      <button className='mas' onClick={handleMas}>Mas</button>
      </div>
      
    </div>
  );
}

export default App;
