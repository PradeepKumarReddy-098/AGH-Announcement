import AnnouncementCard from './AnnouncementCard'
import { ModalOverlay } from '../styles/AnnouncementModalStyles'

function AnnouncementModal({ announcement, onClose }) {
  return (
    <ModalOverlay>
      <AnnouncementCard announcement={announcement} onClose={onClose} isModal />
    </ModalOverlay>
  )
}

export default AnnouncementModal
