import styled from "styled-components";

export const PageShell = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 20px;
`;

export const HeroPanel = styled.section`
  width: min(100%, 760px);
  padding: 40px;
  border: 1px solid rgba(130, 152, 176, 0.2);
  border-radius: 32px;
  background:
    radial-gradient(
      circle at top left,
      rgba(99, 169, 224, 0.18),
      transparent 28%
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.96),
      rgba(244, 249, 255, 0.94)
    );
  box-shadow: 0 28px 80px rgba(15, 31, 58, 0.12);
  text-align: left;

  h1 {
    margin: 0 0 16px;
    font-size: clamp(2.4rem, 6vw, 4.4rem);
    line-height: 0.98;
  }

  @media (max-width: 640px) {
    padding: 28px 20px;
    border-radius: 24px;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  margin-bottom: 18px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1f6ea5;
  background: rgba(93, 163, 219, 0.14);
`;

export const HeroCopy = styled.p`
  max-width: 58ch;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #566578;
`;

export const Actions = styled.div`
  margin-top: 28px;
`;

export const PrimaryButton = styled.button`
  border: 0;
  border-radius: 14px;
  padding: 14px 22px;
  font: inherit;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #2c8ed2 0%, #2478b6 100%);
  box-shadow: 0 14px 28px rgba(44, 142, 210, 0.24);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
    box-shadow: none;
  }
`;

export const StatusCard = styled.div`
  margin-top: 30px;
  padding: 24px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(130, 152, 176, 0.18);

  h2 {
    margin: 0 0 12px;
    font-size: 1.1rem;
  }
`;

export const AnnouncementPreview = styled.div`
  strong {
    display: block;
    margin-bottom: 8px;
    font-size: 1.1rem;
    color: #182231;
  }

  p {
    margin: 0 0 10px;
  }

  span {
    font-size: 0.92rem;
    color: #6a7788;
  }
`;
