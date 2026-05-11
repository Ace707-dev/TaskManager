import { useState, useRef, useEffect } from 'react'
import { useTaskContext } from '../context/TaskContext'

export default function TaskItem({ task }) {
  const { dispatch } = useTaskContext()
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const editRef = useRef(null)

  useEffect(() => {
    if (editing) editRef.current?.focus()
  }, [editing])

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return
    dispatch({
      type: 'EDIT_TASK',
      payload: { id: task.id, title: editTitle.trim(), description: editDesc.trim() },
    })
    setEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDesc(task.description)
    setEditing(false)
  }

  const handleDelete = () => {
    if (confirmDelete) {
      dispatch({ type: 'DELETE_TASK', payload: task.id })
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 2500)
    }
  }

  const date = new Date(task.createdAt).toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short',
  })

  const styles = {
    card: {
      background: task.completed ? 'rgba(22, 163, 74, 0.08)' : 'var(--surface)',
      border: `1px solid ${task.completed ? 'var(--border)' : 'var(--border-light)'}`,
      borderRadius: 'var(--radius)',
      padding: '18px 20px',
      transition: 'all var(--transition)',
      opacity: task.completed ? 0.7 : 1,
      position: 'relative',
      overflow: 'hidden',
    },
    completedBar: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '3px',
      background: task.completed ? 'var(--green)' : 'var(--accent)',
      borderRadius: '3px 0 0 3px',
    },
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: `2px solid ${task.completed ? 'var(--green)' : 'var(--border-light)'}`,
      background: task.completed ? 'var(--green)' : 'transparent',
      cursor: 'pointer',
      flexShrink: 0,
      marginTop: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--transition)',
    },
    checkMark: {
      color: '#0d0d10',
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1,
    },
    body: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '15px',
      color: task.completed ? 'var(--text-muted)' : 'var(--text)',
      textDecoration: task.completed ? 'line-through' : 'none',
      marginBottom: '4px',
      wordBreak: 'break-word',
    },
    description: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      lineHeight: '1.5',
      wordBreak: 'break-word',
      whiteSpace: 'pre-wrap',
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '10px',
    },
    badge: {
      fontSize: '11px',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '3px 8px',
      borderRadius: '20px',
      background: task.completed ? 'var(--green-glow)' : 'var(--amber-glow)',
      color: task.completed ? 'var(--green)' : 'var(--amber)',
      border: `1px solid ${task.completed ? 'var(--green-dim)' : 'rgba(245,158,11,0.25)'}`,
    },
    dateText: {
      fontSize: '11px',
      color: 'var(--text-dim)',
    },
    actions: {
      display: 'flex',
      gap: '6px',
      flexShrink: 0,
    },
    actionBtn: {
      background: 'var(--surface2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontSize: '12px',
      padding: '5px 10px',
      transition: 'all var(--transition)',
      fontFamily: 'var(--font-body)',
      whiteSpace: 'nowrap',
    },
    deleteBtn: {
      background: confirmDelete ? 'rgba(248,113,113,0.15)' : 'var(--surface2)',
      border: `1px solid ${confirmDelete ? 'var(--red)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-sm)',
      color: confirmDelete ? 'var(--red)' : 'var(--text-muted)',
      cursor: 'pointer',
      fontSize: '12px',
      padding: '5px 10px',
      transition: 'all var(--transition)',
      fontFamily: 'var(--font-body)',
      whiteSpace: 'nowrap',
    },
    editInput: {
      background: 'var(--surface2)',
      border: '1px solid var(--accent)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '15px',
      padding: '8px 12px',
      outline: 'none',
      width: '100%',
      marginBottom: '8px',
      boxShadow: '0 0 0 3px var(--accent-glow)',
    },
    editTextarea: {
      background: 'var(--surface2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text)',
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      padding: '8px 12px',
      outline: 'none',
      resize: 'vertical',
      minHeight: '64px',
      width: '100%',
      lineHeight: '1.5',
      marginBottom: '10px',
    },
    editActions: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'flex-end',
    },
    saveBtn: {
      background: 'var(--accent)',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      color: '#fff',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '12px',
      padding: '7px 16px',
    },
    cancelBtn: {
      background: 'transparent',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      padding: '7px 14px',
    },
  }

  return (
    <div style={styles.card} className="task-card">
      <style>{`
        .task-card:hover { border-color: var(--border-light) !important; box-shadow: 0 4px 24px rgba(0,0,0,0.3); }
        .edit-action:hover { color: var(--accent) !important; border-color: var(--accent) !important; background: var(--accent-glow) !important; }
        .toggle-action:hover { color: var(--green) !important; border-color: var(--green-dim) !important; background: var(--green-glow) !important; }
        .del-btn:hover:not(.confirm) { color: var(--red) !important; border-color: var(--red) !important; background: rgba(248,113,113,0.1) !important; }
        .checkbox-btn:hover { transform: scale(1.1); }
      `}</style>

      <div style={styles.completedBar} />

      {editing ? (
        <div style={{ paddingLeft: '8px' }}>
          <input
            ref={editRef}
            style={styles.editInput}
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSaveEdit()}
            placeholder="Título…"
          />
          <textarea
            style={styles.editTextarea}
            value={editDesc}
            onChange={e => setEditDesc(e.target.value)}
            placeholder="Descripción…"
          />
          <div style={styles.editActions}>
            <button style={styles.cancelBtn} onClick={handleCancelEdit}>Cancelar</button>
            <button style={styles.saveBtn} onClick={handleSaveEdit}>Guardar</button>
          </div>
        </div>
      ) : (
        <div style={styles.header}>
          <button
            className="checkbox-btn"
            style={styles.checkbox}
            onClick={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id })}
            title={task.completed ? 'Marcar pendiente' : 'Marcar completada'}
          >
            {task.completed && <span style={styles.checkMark}>✓</span>}
          </button>

          <div style={styles.body}>
            <div style={styles.title}>{task.title}</div>
            {task.description && (
              <div style={styles.description}>{task.description}</div>
            )}
            <div style={styles.meta}>
              <span style={styles.badge}>{task.completed ? 'Completada' : 'Pendiente'}</span>
              <span style={styles.dateText}>{date}</span>
            </div>
          </div>

          <div style={styles.actions}>
            <button
              className="toggle-action action-btn"
              style={styles.actionBtn}
              onClick={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id })}
              title={task.completed ? 'Marcar pendiente' : 'Marcar completada'}
            >
              {task.completed ? '↩ Pendiente' : '✓ Completar'}
            </button>
            <button
              className="edit-action action-btn"
              style={styles.actionBtn}
              onClick={() => setEditing(true)}
            >
              ✎ Editar
            </button>
            <button
              className={`del-btn${confirmDelete ? ' confirm' : ''}`}
              style={styles.deleteBtn}
              onClick={handleDelete}
            >
              {confirmDelete ? '¿Confirmar?' : '✕'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
