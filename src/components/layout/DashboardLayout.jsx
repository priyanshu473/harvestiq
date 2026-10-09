import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import FloatingChatButton from '../common/FloatingChatButton'

export default function DashboardLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-topo" />
      <Navbar />
      <div className="flex max-w-[1600px] mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0 px-5 md:px-8 py-8">
          <Outlet />
        </main>
      </div>
      <FloatingChatButton />
    </div>
  )
}
