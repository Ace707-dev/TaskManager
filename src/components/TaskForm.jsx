import { useState, useRef } from 'react'
import { useTaskContext } from '../context/TaskContext'

export default function TaskForm() {
  const { dispatch } = useTaskContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [shake, setShake] = useState(false)
  const titleRef = useRef(null)

  const handleSubmit = () => {
    if (!title.trim()) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      titleRef.current?.focus()
      return
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    dispatch({ type: 'ADD_TASK', payload: newTask })
    setTitle('')
    setDescription('')
    titleRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) handleSubmit()
  }

  const styles = {
    wrapper: {
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      marginBottom: '28px',
      transition: 'border-color var(--transition)',
    },
    heading: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '13px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: '18px',
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    input: {
      background: 'var(--surface2)',
      border: `1px solid ${shake ? 'var(--red)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text)',
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      padding: '11px 14px',
      outline: 'none',
      transition: 'border-color var(--transition), box-shadow var(--transition)',
      width: '100%',
      animation: shake ? 'shake 0.4s ease' : 'none',
    },
    textarea: {
      background: 'var(--surface2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text)',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      padding: '11px 14px',
      outline: 'none',
      resize: 'vertical',
      minHeight: '80px',
      lineHeight: '1.5',
      transition: 'border-color var(--transition)',
      width: '100%',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '4px',
    },
    hint: {
      fontSize: '12px',
      color: 'var(--text-dim)',
    },
    btn: {
      background: 'var(--accent)',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      color: '#fff',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.05em',
      padding: '10px 22px',
      transition: 'background var(--transition), transform var(--transition), box-shadow var(--transition)',
    },
  }

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .task-input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px var(--accent-glow); }
        .task-textarea:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px var(--accent-glow); }
        .add-btn:hover { background: var(--accent-dim) !important; transform: translateY(-1px); box-shadow: 0 4px 20px var(--accent-glow); }
        .add-btn:active { transform: translateY(0); }
      `}</style>

      <p style={styles.heading}>Nueva tarea</p>

      <div style={styles.fieldGroup}>
        <input
          ref={titleRef}
          className="task-input"
          style={styles.input}
          type="text"
          placeholder="Título de la tarea…"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <textarea
          className="task-textarea"
          style={styles.textarea}
          placeholder="Descripción (opcional)…"
          value={description}
          onChange={e => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div style={styles.row}>
          <span style={styles.hint}>Ctrl+Enter para agregar</span>
          <button className="add-btn" style={styles.btn} onClick={handleSubmit}>
            + Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
