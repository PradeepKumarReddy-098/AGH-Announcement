import styled from "styled-components";

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

  @media (max-width: 560px) {
    align-items: flex-start;
    padding: 40px 20px 0px 20px;
  }
`;

export const ModalCard = styled.div`
  position: relative;
  box-sizing: border-box;
  width: min(100%, 535px);
  max-height: calc(100dvh - 40px);
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 8px;
  padding: 0 28px 30px;
  background: #faf8ff;
  box-shadow: 0 24px 56px rgba(19, 27, 46, 0.18);

  @media (max-width: 560px) {
    width: 100%;
    max-height: calc(100dvh - 4px);
    border-radius: 8px;
    padding: 0 28px 30px;
  }

  @media (max-width: 380px) {
    padding: 0 20px 24px;
  }
`;

export const ModalHeroImage = styled.img`
  display: block;
  width: calc(100% + 56px);
  height: 190px;
  margin: 0 -28px 28px;
  object-fit: cover;
  object-position: top center;

  @media (max-width: 380px) {
    width: calc(100% + 40px);
    height: 120px;
    margin: 0 -20px 24px;
  }
`;

export const ModalHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: ${({ $expanded }) => ($expanded ? "28px" : "0")};
  text-align: center;
  margin-top: -14px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-family: "Work Sans", sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0;
  text-align: center;
  color: #131b2e;

  @media (max-width: 380px) {
    font-size: 22px;
    line-height: 30px;
  }
`;

export const ModalDescription = styled.p`
  max-width: 424px;
  margin: 14px 0 0;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #434653;

  @media (max-width: 380px) {
    font-size: 15px;
    line-height: 22px;
  }
`;

export const CarouselViewport = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  margin: 24px 0 18px;
  padding-top: 24px;
  border-top: 1px solid rgba(19, 27, 46, 0.08);

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 380px) {
    margin: 22px 0 16px;
    padding-top: 22px;
  }
`;

export const OptionsTrack = styled.div`
  display: grid;
  transition: transform 320ms ease;
`;

export const OptionList = styled.div`
  min-height: 152px;

  @media (max-width: 380px) {
    min-height: 168px;
  }
`;

export const OptionItem = styled.div`
  display: grid;
  grid-template-columns: 38px 1fr;
  gap: 12px;
  align-items: start;

  & + & {
    margin-top: 18px;
  }

  @media (max-width: 380px) {
    grid-template-columns: 36px 1fr;
    gap: 10px;
  }
`;

export const OptionBadge = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-top: 2px;
  border-radius: 50%;
  background: #e7eff5;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #131b2e;
`;

export const OptionTitle = styled.h3`
  margin: 0 0 4px;
  font-family: "Work Sans", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0;
  color: #131b2e;
`;

export const OptionCopy = styled.p`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #434653;

  @media (max-width: 380px) {
    font-size: 13px;
    line-height: 19px;
  }
`;

export const EmptyState = styled.div`
  padding: 28px 0;
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
  gap: 12px;
  margin-bottom: 24px;
`;

export const DotButton = styled.button`
  width: 14px;
  height: 14px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  background: #d6d9de;
  transition:
    transform 180ms ease,
    background-color 180ms ease;

  &.active {
    background: #2583c0;
    transform: scale(1.02);
  }
`;

export const ActionButton = styled.button`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 47px;
  padding: 12px 18px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  background: #2583c0;
  box-shadow: none;
  font-family: "Poppins", sans-serif;
`;

export const ActionButtonText = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
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
