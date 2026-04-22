import styled from "styled-components";

export const PageShell = styled.section`
  background: #f5f7fb;
  min-height: 100vh;
  padding: 16px clamp(16px, 4vw, 40px) 48px;
`;

export const PageContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
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

export const PageActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 28px;
`;

export const CreateButton = styled.button`
  align-items: center;
  background: #c8102e;
  border: 1px solid #c8102e;
  border-radius: 6px;
  color: #ffffff;
  display: inline-flex;
  font-size: 14px;
  font-weight: 800;
  justify-content: center;
  min-height: 42px;
  padding: 0 20px;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #a90e27;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(200, 16, 46, 0.24);
    outline-offset: 2px;
  }

  @media (max-width: 450px) {
    width: 100%;
    margin: auto;
  }
`;

export const PageTitle = styled.h1`
  color: #0f172a;
  font-size: clamp(26px, 5vw, 36px);
  font-weight: 900;
  line-height: 1.15;
  margin: 0 0 12px;
  font-size: "Work sen";
`;

export const ErrorMessage = styled.div`
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 6px;
  color: #be123c;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 14px;
  padding: 12px 14px;
`;

export const TableCard = styled.div`
  background: #ffffff;
  border: 1px solid #d6dde8;
  border-radius: 10px;
  overflow: hidden;
  margin: auto;
`;

export const TableScroll = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  min-width: 720px;
  width: 100%;

  th,
  td {
    border-bottom: 1px solid #e8edf5;
    font-size: 14px;
    padding: 22px 28px;
    text-align: left;
    vertical-align: middle;
  }

  th {
    color: #334155;
    font-weight: 800;
  }

  td {
    color: #0f172a;
    font-weight: 500;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 220px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    text-align: right;
    width: 230px;
  }

  @media (max-width: 760px) {
    min-width: 0;

    thead {
      display: none;
    }

    tr {
      border-bottom: 1px solid #e8edf5;
      display: grid;
      gap: 12px;
      padding: 18px;
    }

    tbody tr:last-child {
      border-bottom: 0;
    }

    td {
      align-items: center;
      border-bottom: 0;
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      padding: 0;
      text-align: right;
    }

    td::before {
      color: #64748b;
      content: attr(data-label);
      font-weight: 800;
      margin-right: 18px;
      text-align: left;
    }

    td:first-child {
      align-items: flex-start;
      flex-direction: column;
      gap: 6px;
      text-align: left;
    }

    td:first-child::before {
      margin-right: 0;
    }

    th:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3) {
      width: auto;
    }
  }
`;

export const TableHeader = styled.thead`
  background: #eef3fb;
`;

export const StatusBadge = styled.span`
  align-items: center;
  background: ${({ $published }) => ($published ? "#dcfce7" : "#eef2f7")};
  border-radius: 999px;
  color: ${({ $published }) => ($published ? "#15803d" : "#64748b")};
  display: inline-flex;
  font-size: 12px;
  font-weight: 800;
  gap: 7px;
  min-height: 28px;
  padding: 0 12px;

  span {
    background: ${({ $published }) => ($published ? "#22c55e" : "#94a3b8")};
    border-radius: 999px;
    height: 6px;
    width: 6px;
  }
`;

export const ActionsCell = styled.td``;

export const MobileActions = styled.div`
  display: inline-flex;
  gap: 20px;

  @media (max-width: 760px) {
    gap: 10px;
  }
`;

export const ActionButton = styled.button`
  background: transparent;
  border: 0;
  color: ${({ $danger }) => ($danger ? "#c8102e" : "#2563eb")};
  font-size: 13px;
  font-weight: 700;
  padding: 4px;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 14px;
  gap: 8px;
  min-height: 50vh;
  padding: 28px;
  text-align: center;

  h2 {
    color: #0f172a;
    font-size: 24px;
  }

  span {
    color: #64748b;
    margin-bottom: 12px;
  }
`;
