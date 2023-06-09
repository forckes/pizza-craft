import React from 'react'
import '../../scss/app.scss'
import Header from '../Header/Header'
import Content from '../Content/Content'

import pizzas from '../../assets/pizzas.json'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<Content pizzas={pizzas} />
		</div>
	)
}

export default App
