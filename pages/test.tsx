import React, { useState } from "react";
import { departements } from "../lib/myfunctions";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

export default function Departs({
  onDeparts,
  iniDeparts = [],
}: {
  onDeparts: (departs: string[]) => void;
  iniDeparts: string[];
}) {
  const iniDepartsObject: { [key: string]: boolean } = {};
  iniDeparts.map((dep) => {
    iniDepartsObject[dep] = true;
  });
  const [depcheck, setdepcheck] = useState<{ [key: string]: boolean }>(
    iniDepartsObject
  );

  function handleChange(e: any) {
    const name = e.target.name as string;
    const checked = e.target.checked;

    if (checked) {
      const temp = depcheck;
      temp[name] = true;
      setdepcheck(temp);
    } else {
      const temp = depcheck;
      delete depcheck[name];
      setdepcheck(temp);
    }
    onDeparts(Object.keys(depcheck));
  }

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: { xs: 1, md: 2 },
          maxWidth: "500px",
        }}
      >
        {departements.map((departement, i) => {
          return (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  value={Object.keys(depcheck).includes(departement.value)}
                  onChange={handleChange}
                  name={departement.value}
                />
              }
              label={departement.label}
            />
          );
        })}
      </Box>
      <Box>
        {Object.keys(depcheck).map((dep) => (
          <Box key={dep}>{dep}</Box>
        ))}
      </Box>
    </Box>
  );
}
