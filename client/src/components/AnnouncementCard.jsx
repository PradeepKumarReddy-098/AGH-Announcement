import { useEffect, useState } from "react";
import announcementHero from "../assets/announcement-hero.png";
import {
  ModalCard,
  ModalHeroImage,
  ModalHeader,
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
} from "../styles/AnnouncementModalStyles";

const ITEMS_PER_SLIDE = 2;

function getOptionSlides(options) {
  const slides = [];

  for (let index = 0; index < options.length; index += ITEMS_PER_SLIDE) {
    slides.push(options.slice(index, index + ITEMS_PER_SLIDE));
  }

  return slides;
}

function AnnouncementCard({ announcement, onClose, isModal = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const optionSlides = getOptionSlides(announcement?.option || []);
  const hasOptions = optionSlides.length > 0;
  const visibleSlide = hasOptions ? currentSlide % optionSlides.length : 0;

  useEffect(() => {
    if (optionSlides.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % optionSlides.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [optionSlides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % optionSlides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (previous) => (previous - 1 + optionSlides.length) % optionSlides.length
    );
  };

  const handlePointerDown = (event) => {
    if (optionSlides.length <= 1) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStartX(event.clientX);
  };

  const handlePointerUp = (event) => {
    if (dragStartX === null || optionSlides.length <= 1) {
      return;
    }

    const difference = dragStartX - event.clientX;
    setDragStartX(null);

    if (Math.abs(difference) < 40 || optionSlides.length <= 1) {
      return;
    }

    if (difference > 0) {
      goToNextSlide();
    }

    if (difference < 0) {
      goToPreviousSlide();
    }
  };

  const handlePointerCancel = () => {
    setDragStartX(null);
  };

  return (
    <ModalCard
      role={isModal ? "dialog" : undefined}
      aria-modal={isModal ? "true" : undefined}
      aria-labelledby="announcement-title"
    >
      <ModalHeroImage src={announcementHero} alt="" aria-hidden="true" />

      <ModalHeader $expanded={!hasOptions}>
        <ModalTitle id="announcement-title">
          {announcement?.title || "You Announcement Title"}
        </ModalTitle>
        <ModalDescription>
          {announcement?.description ||
            "Your description will display here like this text."}
        </ModalDescription>
      </ModalHeader>

      {hasOptions && (
        <CarouselViewport
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onLostPointerCapture={handlePointerCancel}
        >
          <OptionsTrack
            style={{
              gridTemplateColumns: `repeat(${optionSlides.length}, 100%)`,
              transform: `translateX(-${visibleSlide * 100}%)`,
            }}
          >
            {optionSlides.map((slide, slideIndex) => (
              <OptionList key={`slide-${slideIndex}`}>
                {slide.map((item, itemIndex) => (
                  <OptionItem
                    key={item.id || `${item.title}-${item.description}`}
                  >
                    <OptionBadge>
                      {slideIndex * ITEMS_PER_SLIDE + itemIndex + 1}
                    </OptionBadge>
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
              className={visibleSlide === index ? "active" : ""}
              aria-label={`Go to options slide ${index + 1}`}
              aria-pressed={visibleSlide === index}
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
  );
}

export default AnnouncementCard;
