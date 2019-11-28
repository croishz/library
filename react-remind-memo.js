import React from "react";

const initialState = {
	
}
function App() {
	const [state, setState] = useState(initialState)
	const clicker = () => {
		setState( arg => arg )	// This is <functional update code> / ref. arg = state
	}

	useEffect(()=>{
		// default : state set.
		
		// if deps blank array
		// similar componentDidMount
		
		// possible DOM select
		// props => state
		// REST API call
		// setTimeout, setInterval
		return () => {
			// default : state get.

			// if deps blank array
			// similar componentDidUnmount

			// clearTimeout, clearInterval

		}
	},[])

	return(
		<button type="button" onClick={clicker}>Click</button>
	);
}

export default App;