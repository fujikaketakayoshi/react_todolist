import React, { useState } from "react";

export const App = () => {
    const [todoText, setTodoText] = useState("");
    const [todoList, setNewTodoList] = React.useState([]);
    
    const onChangeTodoText = (event) => {
        setTodoText(event.target.value);
    }
    
    const onClickAdd = () => {
        if (todoText === "") return;
        const newTodo = {
            comment: todoText,
            status: "作業中"
        }
        
        todoList.push(newTodo);
        setTodoText("");
    };
    
    return (
        <>
            <div className="task-area">
                <h1>ToDoリスト</h1>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>コメント</td>
                            <td>状態</td>
                        </tr>
                    </thead>
                    <tbody id="todo-body">
                        {todoList.map((todo, index) => (
                            <tr>
                                <td>{index}</td>
                                <td>{todo.comment}</td>
                                <td><button>{todo.status}</button></td>
                                <td><button>削除</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <h2>新規タスクの追加</h2>
            <div className="add-todo">
                <input value={todoText} onChange={onChangeTodoText} />
                <button onClick={onClickAdd}>追加</button>
            </div>
        </>
    );
}