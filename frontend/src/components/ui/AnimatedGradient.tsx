const AnimatedGradient = () => {
  return (
    <div
      className="animated-gradient"
      style={{
        position: "absolute",
        // top: "200px",
        left: "50%",
        // right: "-10px",
        bottom: "0%",
        height: "50%",
        width: "2000px",
        background: "radial-gradient(circle, #007bffea) 2%, rgba(255,255,255,0) 59%)",
        // background: "rgba(255, 0, 0, 0.5)", // Testez avec un fond rouge semi-transparent
        transform: "translateX(-50%) translateY(-30%)",
        filter: "blur(60px)",
        opacity: 0.8,
        mixBlendMode: "darken",
        zIndex: 0,
      }}
    ></div>
  );
};

export default AnimatedGradient;
