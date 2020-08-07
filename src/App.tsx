import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
	name: string;
	done: boolean;
}

function App() {
	const [newTask, setNewTask] = useState<string>("");
	const [tasks, setTasks] = useState<ITask[]>([]);
	const taskInput = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormElement) => {
		e.preventDefault();
		addTask(newTask);
		setNewTask("");
		taskInput.current?.focus();
	};

	const addTask = (name: string): void => {
		const newTask = [...tasks, { name, done: false }];
		setTasks(newTask);
	};

	const toggleDoneTask = (i: number): void => {
		const newTasks: ITask[] = [...tasks];
		newTasks[i].done = !newTasks[i].done;
		setTasks(newTasks);
	};

	const removeTask = (i: number) => {
		const newTasks: ITask[] = [...tasks];
		newTasks.splice(i, 1);
		setTasks(newTasks);
	};

	return (
		<div className="container p-4">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<input
									autoFocus
									type="text"
									ref={taskInput}
									onChange={(e) => setNewTask(e.target.value)}
									value={newTask}
									className="form-control"
								/>
								<button className="btn btn-success btn-block mt-2">
									Save
								</button>
							</form>
						</div>
					</div>
					{tasks.map((t: ITask, i: number) => (
						<div
							key={i}
							className="card card-body mt-2 d-flex flex-row justify-content-between"
						>
							<h2
								style={{
									textDecoration: t.done
										? "line-through"
										: "",
								}}
								onClick={() => toggleDoneTask(i)}
							>
								{t.name}
							</h2>
							<button
								className="btn btn-danger"
								onClick={() => removeTask(i)}
							>
								×
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
