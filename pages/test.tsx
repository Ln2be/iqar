import { Box, Button } from "@mui/material";
import React, { useState } from "react";

export default function Page() {
  const [value, setValue] = useState(1);

  function Tabpanel({
    value,
    index,
    children,
  }: {
    value: number;
    index: number;
    children: JSX.Element;
  }) {
    return <Box> {value == index && <Box>{children}</Box>}</Box>;
  }

  function Tab({
    value,
    index,
    name,
    handleChange,
  }: {
    value: number;
    index: number;
    name: string;
    handleChange: (hi: number) => void;
  }) {
    return (
      <Box>
        <Button
          style={{
            color: value == index ? "blue" : "GrayText",
          }}
          onClick={() => {
            handleChange(index);
          }}
        >
          {name}
        </Button>
      </Box>
    );
  }
  function handleChange(index: number) {
    setValue(index);
  }
  return (
    <Box>
      <Tab
        value={value}
        name={"Tab One"}
        index={1}
        handleChange={handleChange}
      />
      <Tab
        value={value}
        name={"Tab Two"}
        index={2}
        handleChange={handleChange}
      />
      <Tab
        value={value}
        name={"Tab Three"}
        index={3}
        handleChange={handleChange}
      />
      {/* Tab panels */}
      <Tabpanel value={value} index={1}>
        <Box>Tab one</Box>
      </Tabpanel>
      <Tabpanel value={value} index={2}>
        <Box>Tab two</Box>
      </Tabpanel>{" "}
      <Tabpanel value={value} index={3}>
        <Box>Tab three</Box>
      </Tabpanel>
    </Box>
  );
}

// import { Box, Button, Tab, Tabs } from "@mui/material";
// import React, { useState } from "react";

// const post = {
//   field: "initial",
// };

// let counter = 0;
// export default class Page extends React.Component<any, any> {
//   constructor(props: any) {
//     super(props);
//     this.state = { value: 0 };
//     this.handleChange = this.handleChange.bind(this);
//   }
//   handleChange(value: any) {
//     this.setState({ value: value });
//   }
//   render() {
//     return (
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           // value={value}
//           onChange={this.handleChange}
//           aria-label="basic tabs example"
//         >
//           <Tab label="Item One" />
//           <Tab label="Item Two" />
//           <Tab label="Item Three" />
//         </Tabs>
//         <Box>{this.state.value}</Box>
//       </Box>
//     );
//   }
// }
