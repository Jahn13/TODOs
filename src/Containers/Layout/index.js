import React from 'react';
import { useState } from 'react'
import './index.css'
import { TodoCounter } from '../../TodoCounter/TodoCounter';
import { TodoSearch } from '../../TodoSearch/TodoSearch';
import { TodoList } from '../../TodoList/TodoList';
import { TodoItems } from '../../TodoItem/TodoItem';
import { CreateTodoButton } from '../../CreateTodoButton/CreateTodoButton';
import { TodoFiltro } from '../../TodoFiltro/TodoFiltro';

// const defaultTodos = [
//     { text: 'Cortar cebolla', completed: false },
//     { text: 'Cortar papas', completed: false },
//     { text: 'Cortar zanahorias', completed: true },
//     { text: 'Cortar zanahorias travez', completed: false },
//     { text: 'Llorar con la llorona', completed: false },
// ]
// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1');

function useLocalStorage(itemName, initialValue) {

    const localStorageItem = localStorage.getItem(itemName);
    let parsedItem;

    if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
    } else {
        parsedItem = JSON.parse(localStorageItem);
    }

    const [item, setItem] = useState(parsedItem);

    const saveItem = (newItem) => {
        localStorage.setItem(itemName, JSON.stringify(newItem))
        setItem(newItem)
    }
    return [item, saveItem]
}

const Layout = () => {

    const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = useState("");
    const [filterTodo, setFilterTodo] = useState(todos)

    const completedTodos = todos.filter(todo => !!todo.completed).length;

    const totalTodos = todos.length;

    const searchTodos = filterTodo.filter((todo) => {
        return todo.text.toLowerCase().includes(searchValue.toLowerCase());
    })

    const filterTodos = (event) => {
        switch (event.target.value) {
            case '1':
                setFilterTodo(todos)
                break;
            case '2':
                const filterTodoCompleted = todos.filter(todo => !!todo.completed)
                setFilterTodo(filterTodoCompleted)
                break;
            case '3':
                const filterTodoInCompleted = todos.filter(todo => !!todo.completed === false)
                setFilterTodo(filterTodoInCompleted)
                break;
            default:
                break;
        }
    }

    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => todo.text === text)
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
        if (newTodos.every((todo) => todo.completed === true)) {
            alert("Felicidades! Has completado todas tus tareas")
        }
    }

    const deleteTodo = (text) => {
        // const newTodos = [...todos];
        // const todoIndex = newTodos.findIndex((todo) => todo.text === text)
        // newTodos.splice(todoIndex, 1);
        // saveTodos(newTodos);
        let filter = filterTodo.filter(todo => todo.text !== text)
        let status = todos.filter(todo => todo.text !== text)

        localStorage.setItem('TODOS_V1', JSON.stringify(filter));
        saveTodos(status);
        setFilterTodo(filter);
    }

    return (
        <div className='d-flex justify-content-center'>
            <div className="card text-dark col-lg-5 col-md-12 bg-transparent bg-gradient">
                <div className="d-flex flex-column gap-3">
                    <TodoCounter completed={completedTodos} total={totalTodos} />
                    <div className='d-flex flex-row gap-3'>
                        <TodoSearch
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />
                        <TodoFiltro
                            filterTodos={filterTodos}
                        />
                    </div>
                    <TodoList>
                        {searchTodos.map(todo => (
                            <TodoItems
                                key={todo.text}
                                text={todo.text}
                                completed={todo.completed}
                                onComplete={() => completeTodo(todo.text)}
                                onDelete={() => deleteTodo(todo.text)}
                            />
                        ))}
                    </TodoList>
                    <CreateTodoButton />
                </div>
            </div>
        </div>
    );
}

export { Layout };