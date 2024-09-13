import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [newTodo, setNewTodo] = useState("Taskbychance");
	const [list, setList] = useState(["pilot test1", "pilot test2"])


	const holaClickeame = () => {
		console.log("Hola bebe");
		setList([...list, newTodo]);

	}

	const handleChange = (event) => {

		setNewTodo(event.target.value)

	}
	const deleteTask = (indice) => {
		const newList = list.filter((todo, i) => i !== indice)
		setList(newList);


	}
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">
				Fetch and react
			</h1>
			<div>
				<input type="text" onChange={handleChange} />
				<button onClick={holaClickeame}  >
					Add task
				</button>
			</div>
			<p>New Task:{newTodo} </p>
			<ul>
				{list.map((list, indice) => {
					return (
						<li>
							{list}<button onClick={() => deleteTask()}>Erase</button>

						</li>
					)
				})}

			</ul>
		</div>
	)
}


export default Home;
