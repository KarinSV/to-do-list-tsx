import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    console.log(typeof v1())
    const todoListTitle:string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML, CSS", isDone: false},
        {id: v1(), title: "JS/ES6&", isDone:true},
        {id: v1(), title: "React/Redux", isDone:false},
    ] )

    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(t => t.id !==taskId)
        setTasks(updatedTasks)
    }

    const addTask = (title: string) => {
        const newTask:TaskType = {
            id: v1(),
            title: title,
            isDone:false
        }
        setTasks([newTask, ...tasks])
    }

    const[filter, setFilter] = useState<FilterValuesType>("active")
    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }


    const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t=> t.isDone === false)
            case "completed":
                return tasks.filter(t=> t.isDone === true)
            default:
                return tasks
        }
    }

    const tasksWhatIWantToSee = getTasksForMe(tasks, filter)

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksWhatIWantToSee}
                addTask ={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
