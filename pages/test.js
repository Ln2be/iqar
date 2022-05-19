import React, { useState } from "react";

var deps = [];
export default function Page() {
  const [depcheck, setdepcheck] = useState({
    Tayaret: false,
    Ksar: false,
  });

  function handleChange(e) {
    const name = e.target.name;

    setdepcheck((prev) => {
      let prevdep = { ...prev };
      prevdep[name] = !prevdep[name];
      return prevdep;
    });

    if (deps.includes(name)) {
      const index = deps.indexOf(name);
      if (index > -1) {
        deps.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      deps.push(name);
    }
  }

  function show() {
    console.log(deps);
  }

  return (
    <>
      <button name="Tayaret" onClick={handleChange}>
        update
      </button>
      ;
      <button name="Tayaret" onClick={show}>
        show
      </button>
      ;
    </>
  );
}
