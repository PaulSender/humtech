import React from 'react'
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Button, Dropdown, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function App() {
  const [selection, setselection] = useState("live")
  const [inimage, setinimage] = useState()
  const [outimage, setoutimage] = useState()
  const [status, setstatus] = useState()
  const options = [{ key: 'live', text: 'Live', value: "live" }, { key: 'night', text: 'Night', value: "night" }, { key: 'multiple', text: 'Multiple People', value: 'multiple' }, { key: 'blury', text: 'Burry Photo', value: 'blurry' }]
  function handleSelection(selection) {
    if (selection === 'live') {
      get()
    }
    else {
      console.log(selection)
      get()
    }
  }
  function get() {
    axios.get('http://localhost:3001/process', { params: { type: selection } }).then(res => {
      const { infile, outfile, status } = res.data
      setinimage(infile)
      setoutimage(outfile)
      setstatus(status)
    }).catch(e => {
      console.error(e)
    })
  }
  function handleChange(e, data) {
    setselection(data.value)
    handleSelection(selection)
  }
  handleSelection("live")
  return (
    <div className="App">
      <div>
        <label>Select an example</label>
        <br />
        <Dropdown options={options} selection onChange={handleChange} value={selection} placeholder="Select..." />
        {selection === 'live' && <Button basic color="grey" style={{ marginLeft: '5px' }} onClick={() => get()}>Get Latest Image</Button>}
      </div>
      <div className="photoContainer">
        {inimage && <Image src={`data:image/*;base64,${inimage}`} className="photo" wrapped ui={false} />}
      </div>
      <div className="photoContainer">
        {outimage && <Image src={`data:image/*;base64,${outimage}`} className="photo" wrapped ui={false} />}
      </div>
      <div id="info">
        <p>Fan Status</p>
        {status}
      </div>
    </div>
  );
}

export default App;
