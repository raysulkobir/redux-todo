import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo';

export default function TodoList() {
    const todoList = useSelector((state) => state.todoList);
    const {status, colors} = useSelector((state) => state.filters);

    const filterByColors = (todo) => {
        if (colors.length > 0) {
            return colors.includes(todo?.color);
        }
        return true;
    }

    const filterByStatus = (todo) => {
        switch (status) {
            case 'complete':
                return todo.completed;
            case 'incomplete':
                return !todo.completed
            
            default:
                return true;
        }
    }


    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto" >
            {
                todoList.filter(filterByColors).filter(filterByStatus).map(todo => (
                    <Todo todo={todo} key={todo.id}/>
                ))
            }
            
        </div>
    )
}
