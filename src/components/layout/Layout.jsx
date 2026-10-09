import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingChatButton from '../common/FloatingChatButton'

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-topo" />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  )
}
