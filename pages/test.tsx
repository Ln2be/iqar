import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const post = {
  field: "initial",
};

let counter = 0;
export default class Page extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { counter: 0, array: [0] };
  }
  render() {
    return (  
      <Box>
        <Button
          onClick={() => {
            const object: any = this.state;
            counter++;
            object.array.push(counter);
            this.setState(object);
          }}
        >
          change
        </Button>
        <Box>
          {this.state.array.slice(-1)[0] + "   hey  " + this.state.counter}
        </Box>
      </Box>
    );
  }
}
