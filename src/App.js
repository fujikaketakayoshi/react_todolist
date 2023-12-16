import React, { useState } from "react";

export const App = () => {
    const [todoText, setTodoText] = useState("");
    const [todoList, setNewTodoList] = React.useState([]);
    const [filteredTodoList, setFilteredTodoList] = React.useState([]);
    const [radio, setRadio] = React.useState('all');
    
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
    
    const onClickDelete = (index) => {
        const deletedTodoList = [...todoList];
        deletedTodoList.splice(index,1);
        setNewTodoList(deletedTodoList);
    };
    
    const onClickSwitch = (index) => {
        const switchTodoList = [...todoList];
        if (switchTodoList[index].status === "作業中") {
            switchTodoList[index].status = '完了';
        } else if (switchTodoList[index].status === "完了") {
            switchTodoList[index].status = '作業中';
        }
        setNewTodoList(switchTodoList);
    };
    
    const handleChange = (event) => {
        setRadio(event.target.value);
        if (event.target.value === "imcomplete") {
            const imcompleteTodoList = [...todoList].filter((todo) => todo.status === "作業中");
            setFilteredTodoList(imcompleteTodoList);
        } else if (event.target.value === "complete") {
            const completeTodoList = [...todoList].filter((todo) => todo.status === "完了");
            setFilteredTodoList(completeTodoList);
        } return;
    };
    
    
    return (
        <>
            <div className="complete-area">
                <label>
                    <input type="radio" value="all" onChange={handleChange} checked={radio === 'all'} />
                    すべて
                </label>
                
                <label>
                    <input type="radio" value="imcomplete" onChange={handleChange} checked={radio === 'imcomplete'} />
                    作業中
                </label>
                
                <label>
                    <input type="radio" value="complete" onChange={handleChange} checked={radio === 'complete'} />
                    完了
                </label>
            </div>
        
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
                    {
                        radio === 'all' ? 
                    <tbody id="todo-body">
                        {todoList.map((todo, index) => (
                            <tr>
                                <td>{index}</td>
                                <td>{todo.comment}</td>
                                <td><button onClick={() => onClickSwitch(index)}>{todo.status}</button></td>
                                <td><button onClick={() => onClickDelete(index)}>削除</button></td>
                            </tr>
                        ))}
                    </tbody>
                    :
                    <tbody id="todo-body">
                        {filteredTodoList.map((todo, index) => (
                            <tr>
                                <td>{index}</td>
                                <td>{todo.comment}</td>
                                <td><button onClick={() => onClickSwitch(index)}>{todo.status}</button></td>
                                <td><button onClick={() => onClickDelete(index)}>削除</button></td>
                            </tr>
                        ))}
                    </tbody>
                    }
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