import { createContext, useContext, useReducer, useEffect } from 'react'

const TaskContext = createContext(null)

const initialState = {
  tasks: [],
  filter: 'all',
}

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] }

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }

    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      }

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? { ...t, title: action.payload.title, description: action.payload.description }
            : t
        ),
      }

    case 'SET_FILTER':
      return { ...state, filter: action.payload }

    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload }

    default:
      return state
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(saved) })
    }
  }, [])

  // Save to localStorage on tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }, [state.tasks])

  const filteredTasks =
    state.filter === 'completed'
      ? state.tasks.filter(t => t.completed)
      : state.filter === 'pending'
      ? state.tasks.filter(t => !t.completed)
      : state.tasks

  const counts = {
    all: state.tasks.length,
    completed: state.tasks.filter(t => t.completed).length,
    pending: state.tasks.filter(t => !t.completed).length,
  }

  return (
    <TaskContext.Provider value={{ state, dispatch, filteredTasks, counts }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TaskContext)
}
