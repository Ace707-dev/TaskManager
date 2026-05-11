import { useTaskContext } from '../context/TaskContext'

export default function Header() {
  const { counts } = useTaskContext()

  const pct = counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100)

  const styles = {
    header: {
      marginBottom: '32px',
    },
    top: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: '20px',
      gap: '16px',
      flexWrap: 'wrap',
    },
    titleGroup: {},
    eyebrow: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '11px',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: '4px',
    },
    title: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(28px, 5vw, 40px)',
      color: 'var(--text)',
      lineHeight: 1.1,
    },
    statsRow: {
      display: 'flex',
      gap: '16px',
    },
    stat: {
      textAlign: 'right',
    },
    statNum: (color) => ({
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '22px',
      color,
      lineHeight: 1,
    }),
    statLabel: {
      fontSize: '11px',
      color: 'var(--text-dim)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    progressWrap: {
      background: 'var(--border)',
      borderRadius: '4px',
      height: '4px',
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      width: `${pct}%`,
      background: `linear-gradient(90deg, var(--accent), var(--green))`,
      borderRadius: '4px',
      transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
    },
    progressMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '6px',
    },
    progressText: {
      fontSize: '12px',
      color: 'var(--text-dim)',
    },
    progressPct: {
      fontSize: '12px',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      color: pct === 100 ? 'var(--green)' : 'var(--accent)',
    },
  }

  return (
    <header style={styles.header}>
      <div style={styles.top}>
        <div style={styles.titleGroup}>
          <div style={styles.eyebrow}>Gestor de Tareas</div>
          <h1 style={styles.title}>Mis Tareas</h1>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <div style={styles.statNum('var(--accent)')}>{counts.all}</div>
            <div style={styles.statLabel}>Total</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum('var(--amber)')}>{counts.pending}</div>
            <div style={styles.statLabel}>Pendientes</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum('var(--green)')}>{counts.completed}</div>
            <div style={styles.statLabel}>Completadas</div>
          </div>
        </div>
      </div>

      {counts.all > 0 && (
        <div>
          <div style={styles.progressWrap}>
            <div style={styles.progressBar} />
          </div>
          <div style={styles.progressMeta}>
            <span style={styles.progressText}>
              {counts.completed} de {counts.all} completadas
            </span>
            <span style={styles.progressPct}>{pct}%</span>
          </div>
        </div>
      )}
    </header>
  )
}
