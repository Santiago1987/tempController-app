const ErrorMsg = ({ message }: { message: string }) => {
  let noVisibleStyle: React.CSSProperties = {
    visibility: "hidden",
    opacity: 1,
  };
  let visibleStyle: React.CSSProperties = { visibility: "visible", opacity: 1 };

  return (
    <div style={message ? visibleStyle : noVisibleStyle}>
      <h3>{message}</h3>
    </div>
  );
};

export default ErrorMsg;
