import { useTaskContext } from '../context/TaskContext'

export default function TaskFilter() {
  const { state, dispatch, counts } = useTaskContext()

  const handleChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: e.target.value })
  }

  const filterLabels = {
    all: 'Todas',
    pending: 'Pendientes',
    completed: 'Completadas',
  }

  const styles = {
    bar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    },
    label: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '13px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
    },
    selectWrapper: {
      position: 'relative',
    },
    select: {
      appearance: 'none',
      background: 'var(--surface)',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text)',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.04em',
      padding: '9px 36px 9px 14px',
      outline: 'none',
      transition: 'border-color var(--transition), box-shadow var(--transition)',
    },
    arrow: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      fontSize: '10px',
    },
    counter: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    counterLabel: {
      fontSize: '13px',
      color: 'var(--text-muted)',
    },
    counterNum: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '26px',
      color: state.filter === 'completed'
        ? 'var(--green)'
        : state.filter === 'pending'
        ? 'var(--amber)'
        : 'var(--accent)',
      lineHeight: 1,
      transition: 'color var(--transition)',
    },
    pills: {
      display: 'flex',
      gap: '8px',
    },
    pill: (active) => ({
      background: active ? 'var(--accent-glow)' : 'transparent',
      border: `1px solid ${active ? 'var(--accent-dim)' : 'var(--border)'}`,
      borderRadius: '20px',
      color: active ? 'var(--accent)' : 'var(--text-dim)',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '12px',
      letterSpacing: '0.04em',
      padding: '5px 12px',
      transition: 'all var(--transition)',
    }),
  }

  return (
    <div style={styles.bar}>
      <style>{`
        .filter-select:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px var(--accent-glow); }
        .filter-pill:hover { border-color: var(--accent-dim) !important; color: var(--accent) !important; }
      `}</style>

      <div style={styles.left}>
        <span style={styles.label}>Filtrar</span>
        <div style={styles.selectWrapper}>
          <select
            className="filter-select"
            style={styles.select}
            value={state.filter}
            onChange={handleChange}
          >
            <option value="all">Todas las tareas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
          <span style={styles.arrow}>▼</span>
        </div>
      </div>

      <div style={styles.counter}>
        <span style={styles.counterLabel}>{filterLabels[state.filter]}</span>
        <span style={styles.counterNum}>{counts[state.filter]}</span>
      </div>
    </div>
  )
}
