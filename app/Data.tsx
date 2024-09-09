"use client";

import React from "react";
import useParse from "@/hooks/useParse";
import Chart from "./Chart";

function Data() {
  const data = useParse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpE8F5DmYKbvZ5gfkh_c5xhl-jbhIhSSFcvOctYb4sGZClvy42KEiVQ2fyhF4l0gdmlDlzwRUcZJyz/pub?gid=2067535843&single=true&output=csv"
  );

  if (!data) return <div>Loading...</div>;

  return <Chart chartData={data} />;
}

export default Data;
