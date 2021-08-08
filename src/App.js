import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, withStyles, Switch } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';

function App() {
	const [word, setWord] = useState("");
	const [meanings, setMeanings] = useState([]);
	const [category, setCategory] = useState("en");
	const [LightMode, setLightMode] = useState(false);
	const getLocalItems = () => {
	let list = localStorage.getItem('lists');
		if(list) {
			return JSON.parse(localStorage.getItem('lists'));
		}
	}
	const [items, setItems] = useState(getLocalItems());

	const DarkMode = withStyles({
  switchBase: {
    color: grey[300],
    '&$checked': {
      color: grey[500],
    },
    '&$checked + $track': {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);
	const dictionaryApi = async () => {
		try {
			const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
			setMeanings(data.data);
		}
		catch(error)
		{
			console.log(error)
		}
	};

	useEffect(() => {
		dictionaryApi();
		localStorage.setItem('lists', JSON.stringify(items));
	}, [word, category, items]);
  return (
    <div className="App" style={{height:'100vh',backgroundColor:LightMode ? '#fff' : '#282c34', color:LightMode ? 'black' : 'white',
    transition:'all 0.5s linear'}}>
      <Container max-width="md" style={{display:'flex', flexDirection:'column', height:'100vh',
      justifyContent: 'space-evenly'}}>
	  <div
	  style={{position: 'absolute', top: 0, right: 15, paddingTop: 10}}>
	  <span>{LightMode ? "Dark" : "Light"} Mode</span>
	  <DarkMode checked={LightMode}
	  onChange={() => setLightMode(!LightMode)}/>
	  </div>
	  <Header category={category} setCategory={setCategory} word={word} setWord={setWord} 
	  LightMode={LightMode}
	  items={items} setItems={setItems}/>
	  
	  <Definitions word={word} meanings={meanings} category={category}
	  LightMode={LightMode} />
	  </Container>
    </div>
  );
}

export default App;
