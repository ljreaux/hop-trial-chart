"use client";

import React, { useEffect, useState } from "react";
import useParse from "@/hooks/useParse";
import Chart from "./Chart";
import Spinner from "@/components/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import lodash from "lodash";

function Data() {
  const { data, filters, sortData } = useParse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpE8F5DmYKbvZ5gfkh_c5xhl-jbhIhSSFcvOctYb4sGZClvy42KEiVQ2fyhF4l0gdmlDlzwRUcZJyz/pub?gid=2067535843&single=true&output=csv"
  );
  const [selected, setSelected] = useState("hops");

  useEffect(() => console.log(selected), [selected]);

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-screen gap-4 text-3xl">
        Loading <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col w-full items-center justify-center gap-6 ">
      <div className="flex gap-4 items-center justify-center w-full">
        <Select
          onValueChange={(val) => {
            sortData(val);
            setSelected(val);
          }}
        >
          <SelectTrigger value={selected} className="max-w-96">
            <SelectValue placeholder="Select a value to sort by..." />
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem value={filter} key={filter}>
                {lodash.startCase(filter)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Chart chartData={data} />
    </div>
  );
}

export default Data;
