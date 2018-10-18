import React from 'react'
import '../App.css'
 class Searching extends React.Component {

 	state = {
 		searchStr: ' ',
 		markers:[]
 	};

 	componentDidMount(){
 		this.setState({markers: this.props.marker})
 	}
//filtering the list of locations
 	findLoc = (loc) =>{
 		let self = this;
 		let markers = this.props.marker;
 		let newMarkers = [];
 		this.props.infoWindows.close();
//markers show or hide acc to search input
 		markers.forEach(function (e) {
 			/* body... */
 			if (e.title.toLowerCase().indexOf(loc.toLowerCase()) >= 0) {
 				e.setVisible(true);
 				newMarkers.push(e);
 			}
 			else {
 				e.setVisible(false)
 			}
 		});
 		self.setState({markers: newMarkers})
 	};
 	render(){
 		let setmark = this.props.showInfo,
 		locs = this.props.locations;
//below are the created list items as per search results
 		return(
 			<div id='searchContainer'>
 				<input type="text" id="searchInput" className="search" placeholder="Search Places.." 
 				tabIndex={0}
 				onChange={e => this.findLoc(e.target.value)}/>
 			<div className="searchList">
 			<ul aria-label="Venues">
 				{this.state.markers.length > 0 ? 
 					this.state.markers.map(function (mark, i) {
 						/* body... */
 						let current = locs.find(function(e) {
 							return mark.title === e.name
 						});
 						return(<li key={i}
 							tabIndex={0}
 							onClick={e => setmark(mark,current)}>{mark.title}</li>)
 					})
 					: (<span><li> No results found</li></span>)
 				}
 				</ul>
 				</div>
 				</div>

 			)

 	}
 }
 export default Searching