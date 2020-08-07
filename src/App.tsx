import React, { useState } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>
interface ITask {
	name: string;
	done: boolean
}

function App() {

	const [newTask, setNewTask] = useState<string>('')
	const [tasks, setTasks] = useState<ITask[]>([])

	const handleSubmit = (e: FormElement) => {
		e.preventDefault()
		addTask(newTask)
		setNewTask('')
	}

	const addTask = (name: string) =>{
		const newTask = [...tasks, { name, done: false }]
		setTasks(newTask)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} />
				<button>
					Save
				</button>
			</form>
		</>
	);
}

export default App;
