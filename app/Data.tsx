"use client";

import React, { useCallback, useState } from "react";
import { saveAs } from "file-saver";
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
import { useGenerateImage } from "recharts-to-png";
import { Button } from "@/components/ui/button";

function Data() {
  const { data, filters, sortData } = useParse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpE8F5DmYKbvZ5gfkh_c5xhl-jbhIhSSFcvOctYb4sGZClvy42KEiVQ2fyhF4l0gdmlDlzwRUcZJyz/pub?gid=2067535843&single=true&output=csv"
  );
  const [selected, setSelected] = useState("hops");
  const [getDivJpeg, { ref }] = useGenerateImage<HTMLDivElement>({
    quality: 0.8,
    type: "image/png",
  });

  const handleDivDownload = useCallback(async () => {
    const jpeg = await getDivJpeg();
    if (jpeg) {
      saveAs(jpeg, "40-Hops-Mead-Test-Chart.png");
    }
  }, [getDivJpeg]);
  if (!data)
    return (
      <div className="text-3xl">
        <span className="flex items-center justify-center gap-4">
          Loading <Spinner />
        </span>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 px-32 w-full max-w-6xl">
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

      <Chart chartData={data} chartRef={ref} />
      <Button onClick={handleDivDownload}>Download Chart</Button>
    </div>
  );
}

export default Data;
