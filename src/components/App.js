import React from 'react'
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies} from '../actions';

class App extends React.Component {
	componentDidMount () {
		const {store} = this.props;
		store.subscribe(() => {
			console.log('UPDATED');
			this.forceUpdate();
		})
		// make api call
		// dispatch action
		store.dispatch(addMovies(data));

		console.log(store.getState());
	}
	render () {
		console.log('RENDER');
		const {list}  = this.props.store.getState(); // list, favourites
		return (
			<div className="App">
			<Navbar />
			<div className="main">
				<div className="tabs">
				<div className="tab">Movies</div>
				<div className="tab">Favorites</div>
				</div>

				<div className="list"> 
					{list.map((movie, index) => (
						<MovieCard movie={movie} key={`movies-${index}`} />
					))}
				</div>
			</div>
			</div>
		);
	}
}

export default App;
