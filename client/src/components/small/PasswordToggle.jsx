import React, { useState } from "react";

const PasswordToggle = () => {
  const [visible, setVisible] = useState(false);

  const inputType = visible ? "text" : "password";

  const icon = (
    <i
      onClick={() => setVisible((show) => !show)}
      className={`addon-icon fa-solid fa-${visible ? "eye-slash" : "eye"}`}
    ></i>
  );

  return [inputType, icon];
};

export default PasswordToggle;
