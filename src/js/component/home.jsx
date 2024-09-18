import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [newTodo, setNewTodo] = useState("Taskbychance");
	const [list, setList] = useState([])


	const holaClickeame = () => {
		console.log("Hola bebe");
		setList([...list, newTodo]);

	}

	const handleChange = (event) => {

		setNewTodo(event.target.value)

	}
	const deleteTask = (index) => {
		const newList = list.filter((todo, i) => i !== index)
		setList(newList);


	}

	const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users/Adolfo1996', {
			method: "POST",

		})
			.then(resp => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				console.log(resp.status); // El código de estado 200, 300, 400, etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como string
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}
	const getList = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/users/Adolfo1996')
			const data = await response.json()
			if (response.status == 404) {
				createUser()

			}
			if (response.ok) {
				setList(data.todos)
			}
		} catch (error) { }
	}

	const deleteUser = async (id) => {

		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			})

			getList()

		}
		catch (error) {
			console.log(error)

		}
	}

	
	const addNewTask = () => {
		fetch('https://playground.4geeks.com/todo/todos/Adolfo1996', {
			method: "POST",
			body: JSON.stringify({
				"label": newTodo,
				"is_done": false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (resp.ok) {
					getList()
				}
			})

			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}

	useEffect(() => {
		getList()
	}, [])


	return (
		<div className="text-center">
			<h1 className="text-center mt-5">
				Fetch and react
			</h1>
			<div>
				<input type="text" value={newTodo} onChange={handleChange} />
				<button type="button" class="btn btn-success" onClick={addNewTask}  >
					Add task
				</button>
			</div>
			<p>New Task:{newTodo} </p>
			<ul>
				{list.map((item, index) => {
					return (
						<li key={index}>
							{item.label}<button type="button" class="btn btn-danger" onClick={() => deleteUser(item.id)}>Erase</button>

						</li>
					)
				})}

			</ul>
		</div>
	)
}


export default Home;
