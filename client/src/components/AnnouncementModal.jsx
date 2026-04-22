import { useState } from 'react'
import './AnnouncementModal.css'

const ITEMS_PER_SLIDE = 2

function getOptionSlides(options) {
  const slides = []

  for (let index = 0; index < options.length; index += ITEMS_PER_SLIDE) {
    slides.push(options.slice(index, index + ITEMS_PER_SLIDE))
  }

  return slides
}

function AnnouncementModal({ announcement, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const optionSlides = getOptionSlides(announcement.option || [])

  const handleTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX
    const difference = touchStartX - touchEndX

    if (Math.abs(difference) < 40) {
      return
    }

    if (difference > 0 && currentSlide < optionSlides.length - 1) {
      setCurrentSlide((previous) => previous + 1)
    }

    if (difference < 0 && currentSlide > 0) {
      setCurrentSlide((previous) => previous - 1)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="announcement-title">
        <div className="modal-header">
          <div className="header-icon" aria-hidden="true">
            ✦
          </div>
          <span className="modal-badge">{announcement.title}</span>
          <h2 id="announcement-title" className="modal-title">
            {announcement.description}
          </h2>
          <p className="modal-description">
            Please review the available options below. This popup is shown only
            for published announcements.
          </p>
        </div>

        <div className="carousel-viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div
            className="options-track"
            style={{
              gridTemplateColumns: `repeat(${Math.max(optionSlides.length, 1)}, 100%)`,
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {(optionSlides.length ? optionSlides : [[]]).map((slide, slideIndex) => (
              <div className="option-list" key={`slide-${slideIndex}`}>
                {slide.length ? (
                  slide.map((item) => (
                    <div className="option-item" key={item.id || `${item.title}-${item.description}`}>
                      <div className="option-badge">{item.title}</div>
                      <div>
                        <h3 className="option-title">{`Option ${item.title}`}</h3>
                        <p className="option-copy">{item.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No options available for this announcement.</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {optionSlides.length > 1 && (
          <div className="carousel-dots">
            {optionSlides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`dot-button ${currentSlide === index ? 'active' : ''}`}
                aria-label={`Go to options slide ${index + 1}`}
                aria-pressed={currentSlide === index}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}

        <button type="button" className="action-button" onClick={onClose}>
          Got It
        </button>
      </div>
    </div>
  )
}

export default AnnouncementModal
