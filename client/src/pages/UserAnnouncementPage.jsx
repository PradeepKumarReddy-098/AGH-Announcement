import { useEffect, useState } from 'react'
import AnnouncementModal from '../components/AnnouncementModal'
import { PageShell, HeroPanel, Eyebrow, HeroCopy, Actions, PrimaryButton, StatusCard, AnnouncementPreview } from '../styles/AppStyles'

const API_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/announcements/published'

function UserAnnouncementPage() {
  const [announcement, setAnnouncement] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(API_URL)
        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to load announcement')
        }

        const [publishedAnnouncement] = result.data || []
        setAnnouncement(publishedAnnouncement || null)

        if (publishedAnnouncement) {
          const storageKey = `announcement-seen-${publishedAnnouncement.id}`
          setIsModalOpen(!window.localStorage.getItem(storageKey))
        }
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnouncement()
  }, [])

  const handleCloseModal = () => {
    if (announcement?.id) {
      window.localStorage.setItem(`announcement-seen-${announcement.id}`, 'true')
    }

    setIsModalOpen(false)
  }

  const handleReopenModal = () => {
    if (announcement) {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <PageShell>
        <HeroPanel>
          <Eyebrow>Campus Updates</Eyebrow>
          <h1>Announcement Popup UI</h1>
          <HeroCopy>
            Published announcements are loaded from the server and shown once
            per visitor. You can reopen the current announcement any time.
          </HeroCopy>

          <Actions>
            <PrimaryButton
              type="button"
              onClick={handleReopenModal}
              disabled={!announcement}
            >
              View Announcement
            </PrimaryButton>
          </Actions>

          <StatusCard>
            <h2>Live Status</h2>
            {isLoading && <p>Loading published announcement...</p>}
            {!isLoading && error && <p>{error}</p>}
            {!isLoading && !error && !announcement && (
              <p>No published announcement is available right now.</p>
            )}
            {!isLoading && announcement && (
              <AnnouncementPreview>
                <strong>{announcement.title}</strong>
                <p>{announcement.description}</p>
                <span>
                  {announcement.option?.length || 0} option
                  {announcement.option?.length === 1 ? '' : 's'}
                </span>
              </AnnouncementPreview>
            )}
          </StatusCard>
        </HeroPanel>
      </PageShell>

      {isModalOpen && announcement && (
        <AnnouncementModal announcement={announcement} onClose={handleCloseModal} />
      )}
    </>
  )
}

export default UserAnnouncementPage
