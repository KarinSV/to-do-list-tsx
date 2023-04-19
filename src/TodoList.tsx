import React, {ChangeEvent, FC, useRef, useState} from 'react';
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
    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"Please, enter title"}
                    value={title}
                    onChange={setTitleHandler}
                />
                <button
                    disabled={isAddBtnDisabled}
                    onClick={()=> {
                        props.addTask(title)
                        setTitle("") // remove title after adding new input
                    }}
                        >+</button>
                {titleMaxlengthWarning}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;