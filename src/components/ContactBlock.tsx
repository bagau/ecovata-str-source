import React from "react";

const ContactBlock: React.FC = () => {
  return (
    <div
      style={{
        marginTop: "3rem",
        marginBottom: "1rem",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          marginBottom: "0.5rem",
          color: "#2c3e50",
          fontWeight: "bold",
        }}
      >
        Нужно утепление дома эковатой?
      </div>
      <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#e74c3c" }}>
        +7 (917) 428-37-07, +7 (962) 526-70-25
      </div>
    </div>
  );
};

export default ContactBlock;
