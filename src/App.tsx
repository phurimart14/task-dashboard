import { useEffect } from 'react';
import { useTaskStore } from './store/useTaskStore';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';

function App() {
  const theme = useTaskStore((state) => state.theme);

  // Apply theme class ที่ <html> element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}

export default App;