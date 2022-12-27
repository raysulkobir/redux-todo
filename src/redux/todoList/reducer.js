import initialStart from './initialStart';
import {ADDED, TOGGLE, COLORSELECTED, DELETED, ALLCOMPLETE, CLEARCOMPLETED} from './actionTypes';

const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0)
    return maxId+1;
}

const reducer = (state = initialStart, action) => {
    switch(action.type) {
    case ADDED:
        return [
            ...state,
            {
                'id': nextTodoId(state),
                'text': action.payload,
                'completed': false,
            }
        ]

    case TOGGLE:
        return state.map(todo => {
            if(todo.id !== action.payload){
                return todo;
            }

            return {
                ...todo,
                completed:  !todo.completed,
            }
        })

    case COLORSELECTED:
        const { color, todoId } = action.payload; 
        return state.map(todo => {
            if(todo.id !== todoId){
                return todo;
            }  
            return {
                ...todo,
                color:  color,
            }
        })
            
    case DELETED:
        return state.filter(todo => todo.id !== action.payload);

    case ALLCOMPLETE:
        return state.map(todo => {
            return {
                ...todo,
                completed: true,
            }
        })

    case CLEARCOMPLETED:
        return state.filter(todo => !todo.completed);
    
    default:
        return state;
    }
}
 
export default reducer;