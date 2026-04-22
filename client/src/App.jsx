import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserAnnouncementPage from './pages/UserAnnouncementPage'
import Announcements from './pages/Announcement/Announcements'
import CreateAnnouncement from './pages/CreateAnnouncement/CreateAnnouncement.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserAnnouncementPage />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path='/create-announcement' element={<CreateAnnouncement />}/>
        <Route path='/edit-announcement/:announcementId' element={<CreateAnnouncement />}/>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
