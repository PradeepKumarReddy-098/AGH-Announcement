import styled from "styled-components";

export const PreviewCard = styled.div`
  background:
    radial-gradient(circle at 16% 0%, rgba(255, 255, 255, 0.75) 0 32px, transparent 33px),
    radial-gradient(circle at 88% 12%, rgba(255, 255, 255, 0.55) 0 20px, transparent 21px),
    linear-gradient(180deg, #b8d7ee 0%, #ffffff 42%);
  border-radius: 12px;
  color: #111827;
  min-height: 640px;
  overflow: hidden;
  padding: 42px 32px 28px;
  width: min(100%, 420px);
`;

export const PreviewHeaderIcon = styled.div`
  background: rgba(255, 255, 255, 0.86);
  border-radius: 12px;
  display: grid;
  height: 70px;
  margin: 0 auto 44px;
  place-items: center;
  width: 70px;

  span {
    animation: previewSpin 1.3s linear infinite;
    border: 4px solid #a7c9e2;
    border-top-color: #2087c3;
    border-radius: 999px;
    height: 30px;
    width: 30px;
  }

  @keyframes previewSpin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const PreviewCategory = styled.div`
  background: #b9dcec;
  border-radius: 999px;
  color: #116492;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
  margin: 0 auto 22px;
  padding: 4px 12px;
  text-align: center;
  text-transform: uppercase;
  width: max-content;
`;

export const PreviewTitle = styled.h2`
  color: #111827;
  font-size: 22px;
  line-height: 1.2;
  margin: 0 0 10px;
  text-align: center;
`;

export const PreviewDescription = styled.p`
  color: #4b5563;
  font-size: 14px;
  line-height: 1.45;
  margin: 0 auto 28px;
  max-width: 320px;
  text-align: center;
`;

export const PreviewOptionList = styled.div`
  border-top: 1px solid #eef2f7;
  display: grid;
  gap: 24px;
  min-height: 150px;
  padding-top: 24px;
`;

export const PreviewOption = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 34px 1fr;

  strong {
    color: #111827;
    display: block;
    font-size: 15px;
    line-height: 1.25;
    margin-bottom: 5px;
  }

  span {
    color: #4b5563;
    display: block;
    font-size: 13px;
    line-height: 1.35;
  }
`;

export const PreviewOptionBadge = styled.span`
  align-items: center;
  background: #d9eef4;
  border-radius: 999px;
  color: #375569;
  display: grid;
  font-size: 12px;
  font-weight: 900;
  height: 28px;
  place-items: center;
  width: 28px;
`;

export const PreviewDots = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 42px 0 24px;
`;

export const DotButton = styled.button`
  background: ${({ $active }) => ($active ? "#238bc6" : "#d1d5db")};
  border: 0;
  border-radius: 999px;
  height: 10px;
  padding: 0;
  width: 10px;
`;

export const PreviewFooterButton = styled.button`
  background: #238bc6;
  border: 1px solid #238bc6;
  border-radius: 6px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  min-height: 46px;
  width: 100%;
`;
