const Spinner = () => {
  const spinnerStyle = {
    border: "4px solid rgba(0,0,0,.1)",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    borderLeftColor: "#09f",

    animation: "spin 1s ease infinite",
  };

  return <div style={spinnerStyle}></div>;
};

export default Spinner;
