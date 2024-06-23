const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);

function addTask() {
	const taskText = taskInput.value.trim();
	const taskDate = taskDateInput.value;
	if (taskText && taskDate) {
		const task = {
			text: taskText,
			date: new Date(taskDate),
			done: false
		};
		tasks.push(task);
		taskInput.value = '';
		taskDateInput.value = '';
		renderTasks();
	}
}

function renderTasks() {
	taskList.innerHTML = '';
	tasks.forEach((task, index) => {
		const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const dayName = dayNames[task.date.getDay()];
		const monthName = monthNames[task.date.getMonth()];
		const year = task.date.getFullYear();
		const dateStr = `${dayName}, ${monthName} ${task.date.getDate()}, ${year}`;
		
		const taskHTML = `
			<li class="task ${task.done? 'done' : ''}">
				${task.text} - ${dateStr}
				${task.done? '<span class="tick-mark">&#10004;</span>' : ''}
				<button class="delete-btn" data-index="${index}">Delete</button>
				<button class="done-btn" data-index="${index}">${task.done? 'Undo' : 'Done'}</button>
			</li>
		`;
		taskList.innerHTML += taskHTML;
	});
	
	const deleteBtns = document.querySelectorAll('.delete-btn');
	deleteBtns.forEach((btn) => {
		btn.addEventListener('click', deleteTask);
	});
	
	const doneBtns = document.querySelectorAll('.done-btn');
	doneBtns.forEach((btn) => {
		btn.addEventListener('click', toggleDone);
	});
}

function deleteTask(event) {
	const index = event.target.dataset.index;
	tasks.splice(index, 1);
	renderTasks();
}

function toggleDone(event) {
	const index = event.target.dataset.index;
	tasks[index].done =!tasks[index].done;
	renderTasks();
}

renderTasks();