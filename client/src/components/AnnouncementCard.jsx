import { useState } from 'react'
import {
  ModalCard,
  ModalStars,
  ModalStarsSvg,
  ModalHeader,
  HeaderIcon,
  AnnouncementIcon,
  ModalBadge,
  ModalTitle,
  ModalDescription,
  CarouselViewport,
  OptionsTrack,
  OptionList,
  OptionItem,
  OptionBadge,
  OptionTitle,
  OptionCopy,
  CarouselDots,
  DotButton,
  ActionButton,
  ActionButtonText,
  ActionIcon,
} from '../styles/AnnouncementModalStyles'

const ITEMS_PER_SLIDE = 2

function getOptionSlides(options) {
  const slides = []

  for (let index = 0; index < options.length; index += ITEMS_PER_SLIDE) {
    slides.push(options.slice(index, index + ITEMS_PER_SLIDE))
  }

  return slides
}

function AnnouncementCard({ announcement, onClose, isModal = false }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const optionSlides = getOptionSlides(announcement?.option || [])
  const hasOptions = optionSlides.length > 0

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
    <ModalCard
      role={isModal ? 'dialog' : undefined}
      aria-modal={isModal ? 'true' : undefined}
      aria-labelledby="announcement-title"
    >
      <ModalStars aria-hidden="true">
        <ModalStarsSvg
          viewBox="0 0 560 185"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 72H560" stroke="#F8FAFF" strokeOpacity="0.22" />
          <path d="M0 166H560" stroke="#F8FAFF" strokeOpacity="0.12" />
          <path d="M108 0V185" stroke="#F8FAFF" strokeOpacity="0.14" />
          <path d="M280 0V185" stroke="#F8FAFF" strokeOpacity="0.1" />
          <path d="M454 0V185" stroke="#F8FAFF" strokeOpacity="0.14" />

          <g transform="translate(-24 -1)">
            <path d="M0 40H124" stroke="#F8FAFF" strokeOpacity="0.16" />
            <path d="M62 0V82" stroke="#F8FAFF" strokeOpacity="0.16" />
            <path
              d="M62 0C62 22.0914 79.9086 40 102 40C79.9086 40 62 57.9086 62 80C62 57.9086 44.0914 40 22 40C44.0914 40 62 22.0914 62 0Z"
              fill="#F8FAFF"
              fillOpacity="0.92"
            />
          </g>

          <g transform="translate(144 92)">
            <path d="M0 40H124" stroke="#F8FAFF" strokeOpacity="0.14" />
            <path d="M62 0V82" stroke="#F8FAFF" strokeOpacity="0.14" />
            <path
              d="M62 0C62 22.0914 79.9086 40 102 40C79.9086 40 62 57.9086 62 80C62 57.9086 44.0914 40 22 40C44.0914 40 62 22.0914 62 0Z"
              fill="#F8FAFF"
              fillOpacity="0.78"
            />
          </g>

          <g transform="translate(392 -1)">
            <path d="M0 40H124" stroke="#F8FAFF" strokeOpacity="0.16" />
            <path d="M62 0V82" stroke="#F8FAFF" strokeOpacity="0.16" />
            <path
              d="M62 0C62 22.0914 79.9086 40 102 40C79.9086 40 62 57.9086 62 80C62 57.9086 44.0914 40 22 40C44.0914 40 62 22.0914 62 0Z"
              fill="#F8FAFF"
              fillOpacity="0.92"
            />
          </g>
        </ModalStarsSvg>
      </ModalStars>

      <ModalHeader $expanded={!hasOptions}>
        <HeaderIcon aria-hidden="true">
          <AnnouncementIcon
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44.5 19.5C44.5 20.0304 44.2893 20.5391 43.9142 20.9142C43.5391 21.2893 43.0304 21.5 42.5 21.5H39.5C38.9696 21.5 38.4609 21.2893 38.0858 20.9142C37.7107 20.5391 37.5 20.0304 37.5 19.5C37.5 18.9696 37.7107 18.4609 38.0858 18.0858C38.4609 17.7107 38.9696 17.5 39.5 17.5H42.5C43.0304 17.5 43.5391 17.7107 43.9142 18.0858C44.2893 18.4609 44.5 18.9696 44.5 19.5ZM6.5 19.5C6.5 20.0304 6.71071 20.5391 7.08579 20.9142C7.46086 21.2893 7.96957 21.5 8.5 21.5H11.5C12.0304 21.5 12.5391 21.2893 12.9142 20.9142C13.2893 20.5391 13.5 20.0304 13.5 19.5C13.5 18.9696 13.2893 18.4609 12.9142 18.0858C12.5391 17.7107 12.0304 17.5 11.5 17.5H8.5C7.96957 17.5 7.46086 17.7107 7.08579 18.0858C6.71071 18.4609 6.5 18.9696 6.5 19.5ZM25.5 0.5C24.9696 0.5 24.4609 0.710714 24.0858 1.08579C23.7107 1.46086 23.5 1.96957 23.5 2.5V5.5C23.5 6.03043 23.7107 6.53914 24.0858 6.91421C24.4609 7.28929 24.9696 7.5 25.5 7.5C26.0304 7.5 26.5391 7.28929 26.9142 6.91421C27.2893 6.53914 27.5 6.03043 27.5 5.5V2.5C27.5 1.96957 27.2893 1.46086 26.9142 1.08579C26.5391 0.710714 26.0304 0.5 25.5 0.5ZM12.064 6.067C11.6891 6.44206 11.4784 6.95067 11.4784 7.481C11.4784 8.01133 11.6891 8.51995 12.064 8.895L14.186 11.016C14.3705 11.207 14.5912 11.3594 14.8352 11.4642C15.0792 11.569 15.3416 11.6242 15.6072 11.6265C15.8728 11.6288 16.1361 11.5782 16.3819 11.4776C16.6277 11.3771 16.851 11.2286 17.0388 11.0408C17.2266 10.853 17.3751 10.6297 17.4756 10.3839C17.5762 10.1381 17.6268 9.87476 17.6245 9.6092C17.6222 9.34364 17.567 9.0812 17.4622 8.83719C17.3574 8.59318 17.205 8.37249 17.014 8.188L14.893 6.067C14.7073 5.8812 14.4868 5.73381 14.2441 5.63325C14.0013 5.53269 13.7412 5.48093 13.4785 5.48093C13.2158 5.48093 12.9556 5.53269 12.7129 5.63325C12.4702 5.73381 12.2497 5.8812 12.064 6.067ZM38.934 6.067C39.3089 6.44206 39.5196 6.95067 39.5196 7.481C39.5196 8.01133 39.3089 8.51995 38.934 8.895L36.812 11.016C36.6275 11.207 36.4068 11.3594 36.1628 11.4642C35.9188 11.569 35.6564 11.6242 35.3908 11.6265C35.1252 11.6288 34.8619 11.5782 34.6161 11.4776C34.3703 11.3771 34.147 11.2286 33.9592 11.0408C33.7714 10.853 33.6229 10.6297 33.5224 10.3839C33.4218 10.1381 33.3712 9.87476 33.3735 9.6092C33.3758 9.34364 33.431 9.0812 33.5358 8.83719C33.6406 8.59318 33.793 8.37249 33.984 8.188L36.105 6.067C36.2907 5.8812 36.5112 5.73381 36.7539 5.63325C36.9966 5.53269 37.2568 5.48093 37.5195 5.48093C37.7822 5.48093 38.0423 5.53269 38.2851 5.63325C38.5278 5.73381 38.7483 5.8812 38.934 6.067ZM22.194 35.477C21.9403 35.545 21.7024 35.6623 21.494 35.8222C21.2856 35.9822 21.1108 36.1816 20.9795 36.4091C20.8482 36.6366 20.763 36.8878 20.7288 37.1482C20.6945 37.4086 20.7119 37.6733 20.78 37.927L21.374 40.143C21.4621 40.4716 21.4845 40.8144 21.4401 41.1517C21.3957 41.489 21.2853 41.8143 21.1152 42.1089C20.945 42.4036 20.7185 42.6618 20.4486 42.8689C20.1787 43.076 19.8706 43.228 19.542 43.316C19.2134 43.4041 18.8706 43.4265 18.5333 43.3821C18.196 43.3377 17.8707 43.2273 17.5761 43.0571C17.2814 42.887 17.0232 42.6605 16.8161 42.3906C16.609 42.1207 16.4571 41.8126 16.369 41.484L15.874 39.637C15.806 39.3833 15.6888 39.1454 15.5289 38.937C15.369 38.7287 15.1697 38.5538 14.9422 38.4224C14.4828 38.1572 13.9369 38.0853 13.4245 38.2225C12.9121 38.3597 12.4752 38.6949 12.2099 39.1543C11.9447 39.6137 11.8728 40.1596 12.01 40.672L12.505 42.52C12.9575 44.2085 14.0621 45.6481 15.576 46.5221C17.0899 47.3961 18.889 47.633 20.5775 47.1805C22.266 46.728 23.7056 45.6234 24.5796 44.1095C25.4536 42.5956 25.6905 40.7965 25.238 39.108L24.644 36.891C24.576 36.6373 24.4587 36.3994 24.2988 36.191C24.1388 35.9826 23.9394 35.8078 23.7119 35.6765C23.4844 35.5452 23.2332 35.46 22.9728 35.4258C22.7123 35.3915 22.4477 35.4089 22.194 35.477Z"
              fill="#2277AF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.1698 10.137C26.9041 9.84089 26.5316 9.66247 26.1343 9.641C25.737 9.61952 25.3474 9.75676 25.0513 10.0225C24.7552 10.2883 24.5768 10.6607 24.5553 11.058C24.5339 11.4553 24.6711 11.8449 24.9368 12.141C16.3328 19.741 7.32583 28.93 4.06183 32.306C2.88083 33.528 2.46383 35.362 3.18083 36.997C3.45323 37.6316 3.76002 38.2508 4.09983 38.852C4.45054 39.4471 4.83344 40.0226 5.24683 40.576C6.30483 42.014 8.10083 42.57 9.75083 42.158C14.3058 41.02 26.7658 37.813 37.6508 34.162C37.7804 34.5329 38.0503 34.8381 38.4025 35.0122C38.7548 35.1862 39.1612 35.215 39.5345 35.0926C39.9078 34.9701 40.2181 34.7061 40.3988 34.3572C40.5795 34.0084 40.6162 33.6026 40.5008 33.227L40.4998 33.225C40.4159 32.9719 40.3242 32.7215 40.2248 32.474C39.9373 31.7497 39.6292 31.0337 39.3008 30.327C38.4148 28.399 36.9328 25.447 34.5278 21.282C32.1228 17.117 30.3078 14.357 29.0808 12.626C28.6331 11.9882 28.1672 11.3633 27.6838 10.752C27.5177 10.5442 27.347 10.3402 27.1718 10.14L27.1698 10.137Z"
              fill="#BBD9EB"
            />
            <path
              d="M33.8686 35.3958C33.471 34.4268 33.0522 33.4665 32.6126 32.5158C31.3803 29.8603 30.0296 27.2613 28.5646 24.7268C27.1022 22.1912 25.527 19.7224 23.8436 17.3278C23.2401 16.472 22.6179 15.6294 21.9776 14.8008C21.2376 15.4768 20.4976 16.1598 19.7656 16.8428L19.9736 17.1138C20.4577 17.7536 20.9308 18.4017 21.3926 19.0578C23.0236 21.3783 24.5498 23.7707 25.9666 26.2278C27.3859 28.6833 28.6946 31.2012 29.8886 33.7738C30.2736 34.6054 30.642 35.4445 30.9936 36.2908C31.9523 35.9974 32.9106 35.6991 33.8686 35.3958Z"
              fill="#2277AF"
            />
          </AnnouncementIcon>
        </HeaderIcon>
        <ModalBadge>Announcement</ModalBadge>
        <ModalTitle id="announcement-title">
          {announcement?.title || 'Scheduled Maintenance'}
        </ModalTitle>
        <ModalDescription>
          {announcement?.description ||
            'The site will be undergoing scheduled maintenance today. We appreciate your patience.'}
        </ModalDescription>
      </ModalHeader>

      {hasOptions && (
        <CarouselViewport onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <OptionsTrack
            style={{
              gridTemplateColumns: `repeat(${optionSlides.length}, 100%)`,
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {optionSlides.map((slide, slideIndex) => (
              <OptionList key={`slide-${slideIndex}`}>
                {slide.map((item, itemIndex) => (
                  <OptionItem key={item.id || `${item.title}-${item.description}`}>
                    <OptionBadge>{slideIndex * ITEMS_PER_SLIDE + itemIndex + 1}</OptionBadge>
                    <div>
                      <OptionTitle>{item.title}</OptionTitle>
                      <OptionCopy>{item.description}</OptionCopy>
                    </div>
                  </OptionItem>
                ))}
              </OptionList>
            ))}
          </OptionsTrack>
        </CarouselViewport>
      )}

      {hasOptions && optionSlides.length > 1 && (
        <CarouselDots>
          {optionSlides.map((_, index) => (
            <DotButton
              key={`dot-${index}`}
              type="button"
              className={currentSlide === index ? 'active' : ''}
              aria-label={`Go to options slide ${index + 1}`}
              aria-pressed={currentSlide === index}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </CarouselDots>
      )}

      <ActionButton type="button" onClick={onClose || (() => {})}>
        <ActionButtonText>Got It</ActionButtonText>
        <ActionIcon
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2.5" />
          <path
            d="M6.25 10.25L8.75 12.75L14 7.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </ActionIcon>
      </ActionButton>
    </ModalCard>
  )
}

export default AnnouncementCard
