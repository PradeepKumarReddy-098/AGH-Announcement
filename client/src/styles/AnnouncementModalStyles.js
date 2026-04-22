import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(19, 27, 46, 0.34);
  backdrop-filter: blur(3px);
`

export const ModalCard = styled.div`
  position: relative;
  width: min(100%, 560px);
  overflow: hidden;
  border-radius: 22px;
  padding: 36px 24px 26px;
  background: #ffffff;
  box-shadow: 0 28px 60px rgba(19, 27, 46, 0.22);

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 185px;
    background:
      linear-gradient(rgba(248, 250, 255, 0.18), rgba(248, 250, 255, 0.18)) 0 72px / 100% 1px no-repeat,
      linear-gradient(rgba(248, 250, 255, 0.1), rgba(248, 250, 255, 0.1)) 0 166px / 100% 1px no-repeat,
      linear-gradient(90deg, rgba(248, 250, 255, 0.12), rgba(248, 250, 255, 0.12)) 110px 0 / 1px 100% no-repeat,
      linear-gradient(90deg, rgba(248, 250, 255, 0.1), rgba(248, 250, 255, 0.1)) calc(50% - 1px) 0 / 1px 100% no-repeat,
      linear-gradient(90deg, rgba(248, 250, 255, 0.12), rgba(248, 250, 255, 0.12)) calc(100% - 120px) 0 / 1px 100% no-repeat,
      linear-gradient(180deg, #9ec4e4 0%, #c7daef 58%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
  }
`

export const ModalStars = styled.div`
  position: absolute;
  inset: 0 0 auto 0;
  height: 185px;
  opacity: 0.72;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 55%, rgba(0, 0, 0, 0.18) 100%);
  -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 55%, rgba(0, 0, 0, 0.18) 100%);
  pointer-events: none;
`

export const ModalStarsSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`

export const ModalHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const HeaderIcon = styled.div`
  display: grid;
  place-items: center;
  width: 70px;
  height: 70px;
  margin-bottom: 22px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(244, 241, 247, 0.98) 100%);
  box-shadow: 0 12px 32px rgba(37, 131, 192, 0.12);
`

export const AnnouncementIcon = styled.svg`
  display: block;
  width: 48px;
  height: 48px;
`

export const ModalBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 2px 12px;
  margin-bottom: 20px;
  border-radius: 999px;
  background: rgba(37, 131, 192, 0.14);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2583c0;
`

export const ModalTitle = styled.h2`
  margin: 0;
  font-family: 'Work Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.48px;
  text-align: center;
  color: #131b2e;
`

export const ModalDescription = styled.p`
  max-width: 424px;
  margin: 12px 0 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #434653;
`

export const CarouselViewport = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin: 22px 0 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(19, 27, 46, 0.08);
`

export const OptionsTrack = styled.div`
  display: grid;
  transition: transform 240ms ease;
`

export const OptionList = styled.div`
  min-height: 164px;
`

export const OptionItem = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: start;

  & + & {
    margin-top: 14px;
  }
`

export const OptionBadge = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-top: 2px;
  border-radius: 50%;
  background: #e7eff5;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #131b2e;
`

export const OptionTitle = styled.h3`
  margin: 0 0 4px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #131b2e;
`

export const OptionCopy = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #434653;
`

export const EmptyState = styled.div`
  padding: 28px 0;
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: #434653;
`

export const CarouselDots = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`

export const DotButton = styled.button`
  width: 14px;
  height: 14px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  background: #d6d9de;
  transition: transform 180ms ease, background-color 180ms ease;

  &.active {
    background: #2583c0;
    transform: scale(1.02);
  }
`

export const ActionButton = styled.button`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 48px;
  padding: 12px 18px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  background: #2583c0;
  box-shadow: none;
`

export const ActionButtonText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
`

export const ActionIcon = styled.svg`
  display: block;
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
`
