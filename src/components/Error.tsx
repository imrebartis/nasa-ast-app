import * as React from "react";
import { Typography } from "@mui/material";

interface ComponentProps {
  error: string;
}

export default function Error({ error }: ComponentProps) {
  return (
    <div data-cy={"error-container"}>
      <Typography variant="h3" sx={{ color: "red" }}>
        {error}
      </Typography>
    </div>
  );
}
