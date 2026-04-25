import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(19, 27, 46, 0.34);
  backdrop-filter: blur(3px);

  @media (max-width: 560px) {
    align-items: center;
    padding: 16px;
  }
`;

export const ModalCard = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 560px;
  height: auto;
  max-height: 672px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 24px;
  padding: 0 28px 32px;
  background: #faf8ff;
  box-shadow: 0 24px 56px rgba(19, 27, 46, 0.18);

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 560px) {
    width: 100%;
    max-height: calc(100dvh - 8px);
    border-radius: 16px;
    padding: 0 24px 24px;
  }

  @media (max-width: 380px) {
    padding: 0 16px 24px;
  }
`;

export const ModalHeroContainer = styled.div`
  position: relative;
  height: 184px;
  margin: 0 -28px;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  background: linear-gradient(180deg, #9bc6e2 0%, #faf8ff 100%);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0 48px;

  @media (max-width: 560px) {
    margin: 0 -24px;
    height: 168px;
    border-radius: 16px 16px 0 0;
    padding: 24px 0 40px;
  }

  @media (max-width: 380px) {
    margin: 0 -16px;
    height: 152px;
    padding: 24px 0 32px;
  }
`;

export const HeroStarsFrame = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
  object-position: top center;
  pointer-events: none;
  z-index: 2;

  @media (max-width: 560px) {
    height: 100%;
  }
`;

export const MegaPhoneBackground = styled.div`
  position: relative;
  z-index: 2;
  width: 88px;
  height: 88px;
  background-color: #faf8ff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(19, 27, 46, 0.06);

  @media (max-width: 560px) {
    width: 80px;
    height: 80px;
    border-radius: 16px;
  }
`;

export const HeroMegaphone = styled.img`
  width: 42px;
  height: 50px;
  object-fit: contain;

  @media (max-width: 560px) {
    width: 38px;
    height: 46px;
  }
`;

export const HeroBadgeContainer = styled.div`
  width: 100%;
  position: relative;
  top: -16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroBadge = styled.span`
  background: #bbd9eb;
  color: #1a5d88;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 24px;
  border-radius: 999px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);

  @media (max-width: 560px) {
    font-size: 12px;
    padding: 8px 20px;
  }
`;

export const ModalHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: ${({ $expanded }) => ($expanded ? "24px" : "0")};
  text-align: center;
  margin-top: 10px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-family: "Work Sans", sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.01em;
  text-align: center;
  color: #131b2e;
  overflow-wrap: anywhere;

  @media (max-width: 560px) {
    font-size: 20px;
    line-height: 32px;
  }

  @media (max-width: 380px) {
    padding: 0 8px;
  }
`;

export const ModalDescription = styled.p`
  max-width: 424px;
  margin: 16px 0 0;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #434653;
  white-space: pre-line;
  overflow-wrap: anywhere;
  word-break: break-word;

  @media (max-width: 560px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

export const CarouselViewport = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  margin: 24px 0 0px;
  padding-top: 24px;
  border-top: 1px solid rgba(19, 27, 46, 0.08);

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 560px) {
    margin: 24px 0 16px;
    padding-top: 24px;
  }
`;

export const OptionsTrack = styled.div`
  display: grid;
  transition: transform 320ms ease;
`;

export const OptionList = styled.div`
  min-height: 152px;

  @media (max-width: 560px) {
    min-height: 120px;
  }
`;

export const OptionItem = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: start;
  font-family: "Inter", sans-serif;

  & + & {
    margin-top: 16px;
  }

  @media (max-width: 560px) {
    grid-template-columns: 40px 1fr;
    gap: 12px;
  }
`;

export const OptionBadge = styled.div`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin-top: 2px;
  border-radius: 50%;
  background: #e7eff5;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #131b2e;

  @media (max-width: 560px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

export const OptionTitle = styled.h3`
  margin: 0 0 4px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0;
  color: #131b2e;

  @media (max-width: 560px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const OptionCopy = styled.p`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #434653;

  @media (max-width: 560px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const EmptyState = styled.div`
  padding: 24px 0;
  text-align: center;
  font-family: "Inter", sans-serif;
  color: #434653;
`;

export const CarouselDots = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

export const DotButton = styled.button`
  width: 12px;
  height: 12px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  background: #d6d9de;
  transition:
    transform 180ms ease,
    background-color 180ms ease;

  &.active {
    background: #2583c0;
    transform: scale(1.08);
  }
`;

export const ActionButton = styled.button`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  background: #2583c0;
  box-shadow: none;
  font-family: "Inter", sans-serif;
  transition: background 180ms ease;

  &:hover {
    background: #1f72a8;
  }

  &:active {
    background: #1a6293;
  }
`;

export const ActionButtonText = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
`;

export const ActionIcon = styled.svg`
  display: block;
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
`;
