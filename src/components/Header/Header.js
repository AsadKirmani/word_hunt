import React from 'react';
import './Header.css';
import { TextField, createTheme, ThemeProvider, InputLabel, Select, FormControl, MenuItem, Button } from '@material-ui/core';
import categories from '../../data/category';

const Header = ({ category, setCategory, word, setWord, LightMode, items, setItems }) => {
	const addItem = () => {
		if(!word) {
		}
		else {
			setItems([...items, word]);
			setWord('');
		}
	}

	const darkTheme = createTheme({
  palette: {
    primary: {
	    main:LightMode ? '#000' : '#fff',
    },
	  type:LightMode ? 'light' : 'dark',
  },
});
	const handleChange = (language) => {
		setCategory(language);
		setWord("");
	};

	return (
		<div className="header">
		<span className="title">{word ? word : "Word Hunt" }</span>
		<div className="inputs">
		<ThemeProvider theme={darkTheme}>
		<TextField
		className="search"
		label="Search a word"
		value={word}
		onChange={e => {setWord(e.target.value)}}/>
		<FormControl className="select">
        <InputLabel>Language</InputLabel>
        <Select
	value={category}
	onChange={(e) => handleChange(e.target.value)}>
		{categories.map((option) => (
          <MenuItem key={option.label} value={option.label}>{option.value}</MenuItem>
		))}
        </Select>
      </FormControl>
		</ThemeProvider>
		</div>
		<div>
		<Button onClick={addItem}>Add to favs</Button>
		</div>
		</div>
	)
}

export default Header;
