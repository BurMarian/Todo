// Interfaces
import { ITodo } from '../../interfaces/todo';
import { InferActionsType } from '..';

// Constants
const ADD_TODO = 'todo/ADD_TODO';
const DELETE_TODO = 'todo/DELETE_TODO';
const TOGGLE_TODO = 'todo/TOGGLE_TODO';

const initialState = { todos: [] as Array<ITodo> };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof todoActions>;

const TodoReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: action?.id, text: action?.text, completed: false },
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action?.id),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action?.id
            ? { ...todo, completed: !todo?.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};

// actions
export const todoActions = {
  addTodo: (todo: ITodo) => ({ type: ADD_TODO, ...todo } as const),
  deleteTodo: (id: ITodo['id']) => ({ type: DELETE_TODO, id } as const),
  handleTodoStatus: (id: ITodo['id']) => ({ type: TOGGLE_TODO, id } as const),
};

export default TodoReducer;
