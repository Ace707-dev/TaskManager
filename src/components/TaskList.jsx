import { useTaskContext } from '../context/TaskContext'
import TaskItem from './TaskItem'

export default function TaskList() {
  const { filteredTasks, state } = useTaskContext()

  const styles = {
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    empty: {
      textAlign: 'center',
      padding: '56px 24px',
      background: 'var(--surface)',
      border: '1px dashed var(--border)',
      borderRadius: 'var(--radius)',
    },
    emptyIcon: {
      fontSize: '36px',
      marginBottom: '12px',
      opacity: 0.4,
    },
    emptyTitle: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '16px',
      color: 'var(--text-muted)',
      marginBottom: '6px',
    },
    emptyText: {
      fontSize: '13px',
      color: 'var(--text-dim)',
    },
  }

  const emptyMessages = {
    all: { icon: '📋', title: 'Sin tareas aún', text: 'Agrega tu primera tarea arriba.' },
    pending: { icon: '✅', title: 'Todo completado', text: 'No hay tareas pendientes.' },
    completed: { icon: '🎯', title: 'Sin completadas', text: 'Completa una tarea para verla aquí.' },
  }

  if (filteredTasks.length === 0) {
    const msg = emptyMessages[state.filter]
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>{msg.icon}</div>
        <div style={styles.emptyTitle}>{msg.title}</div>
        <div style={styles.emptyText}>{msg.text}</div>
      </div>
    )
  }

  return (
    <div style={styles.list}>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
