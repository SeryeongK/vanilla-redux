import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const addToDo = (text) => {
	return {
		type: ADD_TODO,
		text,
	};
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case ADD_TODO:
			return [{ text: action.text, id: Date.now() }, ...state];
		case DELETE_TODO:
			return state.filter((toDos) => toDo.id !== parseInt(action.id));
		default:
			return state;
	}
};

const deleteToDo = (id) => {
	return { type: DELETE_TODO, id };
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
	store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = () => {
	const id = e.target.parentNode.id;
	store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
	const toDos = store.getState();
	ul.innerHTML = '';
	toDos.forEach((toDo) => {
		const li = document.createElement('li');
		const btn = document.createElement('button');
		btn.innerText = 'DEL';
		btn.addEventListener('click', deleteToDo);
		li.id = toDo.id;
		li.innerText = toDo.text;
		li.appendChild(btn);
		ul.appendChild(li);
	});
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
	e.preventDefault();
	const toDo = input.value;
	input.value = '';
	store.dispatch({ type: 'ADD_TODO', text: toDo });
};

form.addEventListener('submit', onSubmit);
