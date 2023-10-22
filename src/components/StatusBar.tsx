import styled from "styled-components";
import { Status } from "../types/types";

type StatusBarWrapperProps = {
  status: Status;
};

const StatusBarWrapper = styled.div<StatusBarWrapperProps>`
  height: 20px;
  padding: 24px;
  border-radius: 10px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 460px;
  color: var(--white);
  background-color: ${({ status }) =>
    status === Status.SUCCESS
      ? "var(--success)"
      : status === Status.LOADING
      ? "#efa94d"
      : "var(--error)"};
  visibility: ${({ status }) =>
    status === Status.DEFAULT ? "hidden" : "visible"};
`;

type StatusBarProps = {
  status: Status;
};

const StatusBar = ({ status }: StatusBarProps) => {
  return (
    <StatusBarWrapper status={status} role="statusBar">
      {status === Status.ERROR && (
        <h6 data-testid="errorText">
          Our server is experiencing difficulty…Please wait a moment while we
          fetch the data again. 🫠
        </h6>
      )}
      {status === Status.LOADING && (
        <h6 data-testid="loadingText">Beep, boop...fetching data 🤖</h6>
      )}
      {status === Status.SUCCESS && (
        <h6 data-testid="successText">
          Congratulatons! You’ve fended off the tax auditors 🎉
        </h6>
      )}
    </StatusBarWrapper>
  );
};

export default StatusBar;
