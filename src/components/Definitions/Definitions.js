import React from 'react';
import './Definitions.css';

const Definitions = ({ word, meanings, category, LightMode }) => {
	return (
		<div className="meanings">
		{meanings[0] && word && category==='en' && (
		<audio
		src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
		style={{backgroundColor: '#fff', borderRadius: 10}}
		controls>
		</audio>
		)}
		{word === "" ? (
			<span className="subtitle">Start by typing a word in Search</span>
		) : (
			meanings.map((mean) =>
				mean.meanings.map((item) => item.definitions.map((def) => (
		<div className="singleMean"
		     style={{backgroundColor:LightMode ? 'black' : 'white', color:LightMode ? 'white' : 'black'}}>
			<b>{def.definition}</b>
			<hr style={{backgroundColor: 'black', width: '100%'}}/>
			{def && (
				<span>
				<b>Example: </b>
				</span>
			)}
				{def.synonyms &&(
					<span>
					<b>Synonyms: </b>
					{def.synonyms.map((s)=> `${s}, `)}
					</span>
				)}
				</div>
				))
				)
			)
		)}
		</div>
	)
}

export default Definitions;
