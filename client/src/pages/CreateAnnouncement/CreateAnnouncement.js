import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const PageShell = styled.section`
  background: #f5f7fb;
  min-height: 100vh;
  padding: 26px clamp(16px, 4vw, 40px) 48px;

  * {
    box-sizing: border-box;
  }
`;

export const Tabs = styled.div`
  border-bottom: 1px solid #dce3ee;
  display: flex;
  gap: 32px;
  margin: 0 auto 48px;
  max-width: 1000px;
`;

export const ToastContainer = styled.div`
  display: grid;
  gap: 10px;
  justify-items: end;
  left: clamp(16px, 4vw, 40px);
  pointer-events: none;
  position: fixed;
  right: clamp(16px, 4vw, 40px);
  top: 24px;
  z-index: 20;
`;

export const ToastMessage = styled.div`
  background: ${({ $type }) => ($type === "error" ? "#fef2f2" : "#ecfdf3")};
  border: 1px solid
    ${({ $type }) => ($type === "error" ? "#fecaca" : "#bbf7d0")};
  border-left: 4px solid
    ${({ $type }) => ($type === "error" ? "#c8102e" : "#16a34a")};
  border-radius: 8px;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.14);
  color: ${({ $type }) => ($type === "error" ? "#991b1b" : "#166534")};
  font-size: 14px;
  font-weight: 800;
  max-width: min(420px, 100%);
  padding: 14px 16px;
  pointer-events: auto;
  width: max-content;
`;

export const TabButton = styled.button`
  background: transparent;
  border: 0;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "#df2438" : "transparent")};
  color: ${({ $active }) => ($active ? "#df2438" : "#94a3b8")};
  font-weight: 800;
  padding: 0 0 14px;
`;

export const FormBody = styled.form`
  background: #ffffff;
  border: 1px solid #e6ebf2;
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.03);
  display: grid;
  gap: 34px;
  margin: 0 auto;
  max-width: 1000px;
  padding: clamp(18px, 4vw, 32px);
  width: 100%;
`;

export const FormCard = styled.div`
  display: grid;
  gap: 22px;
  margin: 0;
  min-width: 0;
  padding: 0;
`;

export const FormSection = styled.section`
  display: grid;
  gap: 16px;
  margin: 0;
  min-width: 0;
`;

export const SectionHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 8px;

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const SectionTitle = styled.h2`
  color: #1f2937;
  font-size: 22px;
  margin: 0;
`;

export const AddButton = styled.button`
  background: transparent;
  border: 0;
  color: #c8102e;
  font-weight: 800;
  padding: 8px 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const SubAnnouncementCard = styled.div`
  background: #fbfcfe;
  border: 1px solid #e6ebf2;
  border-radius: 8px;
  margin: 0;
  min-width: 0;
  padding: 22px 30px;
  position: relative;

  @media (max-width: 640px) {
    padding: 18px;
  }
`;

export const FieldGrid = styled.div`
  display: grid;
  gap: 26px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 0;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 8px;
  min-width: 0;
`;

export const Label = styled.span`
  color: #4b5563;
  font-size: 13px;
  font-weight: 900;
`;

export const Input = styled.input`
  background: #ffffff;
  border: 1px solid #cfd8e3;
  border-radius: 5px;
  color: #111827;
  min-height: 56px;
  min-width: 0;
  padding: 0 20px;
  width: 100%;

  &::placeholder {
    color: #8a94a6;
    font-weight: 600;
  }

  &:focus {
    border-color: #df2438;
    outline: 3px solid rgba(223, 36, 56, 0.12);
  }
`;

export const FormTextarea = styled.textarea`
  background: #ffffff;
  border: 1px solid #cfd8e3;
  border-radius: 5px;
  color: #111827;
  line-height: 1.5;
  min-height: 132px;
  min-width: 0;
  padding: 18px 20px;
  resize: vertical;
  width: 100%;

  &::placeholder {
    color: #8a94a6;
    font-weight: 600;
  }

  &:focus {
    border-color: #df2438;
    outline: 3px solid rgba(223, 36, 56, 0.12);
  }
`;

export const ErrorText = styled.span`
  color: #c8102e;
  display: block;
  font-size: 13px;
  font-weight: 800;
  margin-top: 6px;
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: 0;
  color: #94a3b8;
  font-size: 20px;
  font-weight: 900;
  line-height: 1;
  padding: 4px;
  position: absolute;
  right: 20px;
  top: 18px;

  &:hover {
    color: #c8102e;
  }
`;

export const ToggleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0;
  min-width: 0;

  p {
    color: #8a94a6;
    font-size: 13px;
    font-weight: 800;
    margin: 4px 0 0;
  }

  @media (max-width: 560px) {
    align-items: flex-start;
    gap: 18px;
  }
`;

export const FormTitle = styled.h3`
  color: #374151;
  font-size: 16px;
  margin: 0;
`;

export const Switch = styled.label`
  cursor: pointer;
  display: inline-flex;
`;

export const SwitchInput = styled.input`
  position: absolute;
  opacity: 0;

  + span {
    background: #cbd5e1;
    border-radius: 999px;
    height: 24px;
    position: relative;
    transition: background 0.2s ease;
    width: 48px;
  }

  + span::after {
    background: #ffffff;
    border-radius: 999px;
    content: "";
    height: 20px;
    left: 2px;
    position: absolute;
    top: 2px;
    transition: transform 0.2s ease;
    width: 20px;
  }

  &:checked + span {
    background: #df0024;
  }

  &:checked + span::after {
    transform: translateX(24px);
  }
`;

export const SubmitButton = styled.button`
  align-items: center;
  background: #c80020;
  border: 1px solid #c80020;
  border-radius: 6px;
  color: #ffffff;
  display: inline-flex;
  gap: 10px;
  font-weight: 800;
  justify-content: center;
  margin: 0;
  min-height: 58px;
  width: 100%;

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

export const SubmitSpinner = styled.span`
  animation: ${spin} 0.75s linear infinite;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  border-top-color: #ffffff;
  flex: 0 0 auto;
  height: 18px;
  width: 18px;
`;

export const BackButton = styled.button`
  background: transparent;
  border: 0;
  color: #64748b;
  display: block;
  font-weight: 800;
  margin: 18px auto 0;
`;

export const PreviewFrame = styled.div`
  align-items: center;
  display: grid;
  gap: 24px;
  justify-items: center;
`;

export const PreviewButton = styled.button`
  background: #ffffff;
  border: 1px solid #cfd8e3;
  border-radius: 6px;
  color: #374151;
  font-weight: 800;
  min-height: 42px;
  padding: 0 18px;
`;
