import React from 'react'
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Dropdown, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:3001/infile').then(res => {
        setinimage(res.data)
      }).catch(e => {
        console.error(e)
      })
      axios.get('http://localhost:3001/outfile').then(res => {
        setoutimge(res.data)
      }).catch(e => {
        console.error(e)
      })
      axios.get('http://localhost:3001/people').then(res => {
        setpeople(res.data)
      }).catch(e => {
        console.error(e)
      })
    }, 5000);
    return () => clearInterval(interval)
  }, []);
  function handleChange(e, data) {
    setselection(data.value)
  }
  const [inimage, setinimage] = useState()
  const [outimage, setoutimge] = useState()
  const [people, setpeople] = useState()
  const [selection, setselection] = useState("live")
  const options = [{key: 'live', text: 'Live', value: "live"}, {key: 'night', text: 'Night', value: "night"}, {key: 'multiple', text: 'Multiple People', value: 'multiple'}, {key: 'blury', text: 'Burry Photo', value: 'blurry'}]

  return (
    <div className="App">
      <Dropdown options={options} selection onChange={handleChange} value={selection}/>
      {/* <div className="photoContainer">
        {inimage && <Image src={`data:image/*;base64,${inimage}`} className="photo" wrapped ui={false} />}
      </div>
      <div className="photoContainer">
        {outimage && <Image src={`data:image/*;base64,${outimage}`} className="photo" wrapped ui={false} />}
      </div>
      <div>
        <p>People Present?</p>
        {people && <span>{parseInt(people) > 0 ? "Yes" : "No"}</span>}
        <p>How many?</p>
        {people && <span>{people}</span>}
      </div> */}
    </div>
  );
}

export default App;
