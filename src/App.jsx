import { TaskProvider } from './context/TaskContext'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskFilter from './components/TaskFilter'
import TaskList from './components/TaskList'

const appStyles = {
  wrapper: {
    minHeight: '100vh',
    background: 'var(--bg)',
    backgroundImage: `
      radial-gradient(circle at 15% 10%, rgba(249,115,22,0.16) 0%, transparent 30%),
      radial-gradient(circle at 85% 95%, rgba(249,115,22,0.08) 0%, transparent 30%)
    `,
  },
  container: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: 'clamp(24px, 5vw, 56px) clamp(16px, 4vw, 32px)',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
    margin: '8px 0 24px',
  },
}

export default function App() {
  return (
    <TaskProvider>
      <div style={appStyles.wrapper}>
        <div style={appStyles.container}>
          <Header />
          <TaskForm />
          <div style={appStyles.divider} />
          <TaskFilter />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  )
}
