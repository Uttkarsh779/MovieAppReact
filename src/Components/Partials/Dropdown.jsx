import React, { useState } from "react";

const Dropdown = ({ title, options, func }) => {
  // const [Options, setOptions] = useState("abc");
  // const arr = ["abc", "def"];
  return (
    <div className="select">
      <select defaultValue="0" onChange={func} name="format" id="format">
        <option value="0" disabled>
          {title}
        </option>

        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
