import styled from "styled-components";

type StatusBarProps = {
  status: Status;
};

const BaseStatusBar = styled.div<StatusBarProps>`
  background: red;
  height: 10px;
  padding: 16px;
  display: block;
  text-align: center;
  visibility: ${({ status }) =>
    status === Status.DEFAULT ? "hidden" : "visible"};
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckMarkSVG = ({ width, height }: { width: string; height: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={width}
    height={height}
  >
    <path
      fill="#FF4141"
      fill-rule="evenodd"
      d="M61.44 0c33.933 0 61.439 27.507 61.439 61.439s-27.506 61.439-61.439 61.439C27.507 122.879 0 95.372 0 61.439S27.507 0 61.44 0zm12.011 39.151a7.011 7.011 0 0 1 9.986-.027c2.764 2.776 2.775 7.292.027 10.083L71.4 61.445l12.076 12.249c2.729 2.77 2.689 7.257-.08 10.022-2.773 2.765-7.23 2.758-9.955-.013L61.446 71.54 49.428 83.728a7.011 7.011 0 0 1-9.986.027c-2.763-2.776-2.776-7.293-.027-10.084L51.48 61.434 39.403 49.185c-2.728-2.769-2.689-7.256.082-10.022 2.772-2.765 7.229-2.758 9.953.013l11.997 12.165 12.016-12.19z"
      clip-rule="evenodd"
    />
  </svg>
);

const ErrorSVG = ({ width, height }: { width: string; height: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 409.6 405.76"
    width={width}
    height={height}
  >
    <path
      fill="#FF4141"
      fill-rule="evenodd"
      d="M61.44 0c33.933 0 61.439 27.507 61.439 61.439s-27.506 61.439-61.439 61.439C27.507 122.879 0 95.372 0 61.439S27.507 0 61.44 0zm12.011 39.151a7.011 7.011 0 0 1 9.986-.027c2.764 2.776 2.775 7.292.027 10.083L71.4 61.445l12.076 12.249c2.729 2.77 2.689 7.257-.08 10.022-2.773 2.765-7.23 2.758-9.955-.013L61.446 71.54 49.428 83.728a7.011 7.011 0 0 1-9.986.027c-2.763-2.776-2.776-7.293-.027-10.084L51.48 61.434 39.403 49.185c-2.728-2.769-2.689-7.256.082-10.022 2.772-2.765 7.229-2.758 9.953.013l11.997 12.165 12.016-12.19z"
      clip-rule="evenodd"
    />
  </svg>
);

type StatusBar = {
  status: Status;
};

export enum Status {
  SUCCESS = "success",
  ERROR = "error",
  DEFAULT = "default",
}

const StatusBar = ({ status }: StatusBar) => {
  return (
    <BaseStatusBar status={status}>
      {status === Status.ERROR && (
        <>
          <FlexBox>
            <ErrorSVG height="20" width="20" />
            <h6>
              Our server is experiencing difficulty…Please wait a moment to
              submit.
            </h6>
          </FlexBox>
        </>
      )}
      {status === Status.SUCCESS && (
        <span>
          <CheckMarkSVG height="20" width="20" />
          <h6>Congratulatons! You’ve fended off the tax auditors.</h6>
        </span>
      )}
    </BaseStatusBar>
  );
};

export default StatusBar;
