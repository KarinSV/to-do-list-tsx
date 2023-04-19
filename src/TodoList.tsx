import React, {ChangeEvent, FC, useRef, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
}

export type TaskType = {
    id:string
    title:string
    isDone:boolean
}
// FC is function component
const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType)  => {
    const [title, setTitle] = useState<string>("")

    // const TodoList = (props: TodoListPropsType) => {  //more easy, above more modern


    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTaskHandler = ()=> {
        props.addTask(title)
        setTitle("")     // Remove task from input after adding new task to list of tasks
    }
    const tasksListItems: Array<JSX.Element> = props.tasks.map((task: TaskType): JSX.Element => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>props.removeTask(task.id)}>x</button>
            </li>

        )
    })
    const titleMaxLength = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong
    const titleMaxlengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'red'}}>Title is too long </div> // Conditional (ternary) operator
        : null // Conditional (ternary) operator
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)  // Return function
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler() // use Enter button to adding new task

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"Please, enter title"}
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyPressHandler}
                />
                <button
                    disabled={isAddBtnDisabled}
                    onClick={addTaskHandler}
                        >+</button>
                {titleMaxlengthWarning}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={handlerCreator("all")}>All</button>
                <button onClick={handlerCreator("active")}>Active</button>
                <button onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;