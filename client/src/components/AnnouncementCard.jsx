import { useEffect, useRef, useState } from "react";
import megaphoneImage from "../assets/megaphoneImage.svg";
import starsFrameImage from "../assets/stars-frame.png";
import {
  ModalCard,
  ModalHeroContainer,
  HeroStarsFrame,
  MegaPhoneBackground,
  HeroMegaphone,
  HeroBadgeContainer,
  HeroBadge,
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
} from "./AnnouncementModalStyles";

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
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const dragStartXRef = useRef(null);
  const dragPointerIdRef = useRef(null);
  const optionSlides = getOptionSlides(announcement?.option || []);
  const hasOptions = optionSlides.length > 0;
  const visibleSlide = hasOptions ? currentSlide % optionSlides.length : 0;

  useEffect(() => {
    if (optionSlides.length <= 1 || isCarouselPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % optionSlides.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [isCarouselPaused, optionSlides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % optionSlides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (previous) => (previous - 1 + optionSlides.length) % optionSlides.length,
    );
  };

  const clearDrag = () => {
    dragStartXRef.current = null;
    dragPointerIdRef.current = null;
  };

  const pauseCarousel = () => {
    setIsCarouselPaused(true);
  };

  const resumeCarousel = () => {
    setIsCarouselPaused(false);
  };

  const handlePointerDown = (event) => {
    if (!event.isPrimary || optionSlides.length <= 1) {
      return;
    }

    dragStartXRef.current = event.clientX;
    dragPointerIdRef.current = event.pointerId;
    pauseCarousel();

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerUp = (event) => {
    if (
      dragStartXRef.current === null ||
      dragPointerIdRef.current !== event.pointerId ||
      optionSlides.length <= 1
    ) {
      return;
    }

    const difference = dragStartXRef.current - event.clientX;
    clearDrag();
    resumeCarousel();

    if (
      event.currentTarget.hasPointerCapture?.(event.pointerId) &&
      event.currentTarget.releasePointerCapture
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(difference) < 35) {
      return;
    }

    if (difference > 0) {
      goToNextSlide();
    }

    if (difference < 0) {
      goToPreviousSlide();
    }
  };

  const handlePointerCancel = (event) => {
    if (dragPointerIdRef.current === event.pointerId) {
      clearDrag();
      resumeCarousel();
    }
  };

  return (
    <ModalCard
      role={isModal ? "dialog" : undefined}
      aria-modal={isModal ? "true" : undefined}
      aria-labelledby="announcement-title"
    >
      <ModalHeroContainer>
        <HeroStarsFrame src={starsFrameImage} alt="stars" aria-hidden="true" />

        <MegaPhoneBackground>
          <HeroMegaphone
            src={megaphoneImage}
            alt="megaphone"
            aria-hidden="true"
          />
        </MegaPhoneBackground>
      </ModalHeroContainer>

      <HeroBadgeContainer>
        <HeroBadge>Announcement</HeroBadge>
      </HeroBadgeContainer>

      <ModalHeader $expanded={!hasOptions}>
        <ModalTitle id="announcement-title">
          {announcement?.title || "Your Announcement Title"}
        </ModalTitle>
        <ModalDescription>
          {announcement?.description ||
            "Your description will display here like this text."}
        </ModalDescription>
      </ModalHeader>

      {hasOptions && (
        <CarouselViewport
          onMouseEnter={pauseCarousel}
          onMouseLeave={resumeCarousel}
          onFocus={pauseCarousel}
          onBlur={resumeCarousel}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
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
          <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" />
          <path
            d="M6.25 10.25L8.75 12.75L14 7.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </ActionIcon>
      </ActionButton>
    </ModalCard>
  );
}

export default AnnouncementCard;
