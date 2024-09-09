"use client";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Data Obtained by MMM at Mead Stampede 2024.";

const chartConfig = {
  mean: {
    label: "Mean",
    color: "hsl(var(--chart-1))",
  },
  median: {
    label: "Median",
    color: "hsl(var(--chart-2))",
  },
  mode: {
    label: "Mode",
    color: "hsl(var(--chart-3))",
  },
  trimmedMean20: {
    label: "Trimmed Mean 20%",
    color: "hsl(var(--chart-1))",
  },
  trimmedMean40: {
    label: "Trimmed Mean 40%",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface ChartData {
  hops: string;
  mean: number;
  median: number;
  mode: number;
  trimmedMean20: number;
  trimmedMean40: number;
}

export default function Chart({ chartData }: { chartData: ChartData[] }) {
  return (
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle>40 Hops Mead Test</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="relative">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hops"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <Bar
              dataKey="mean"
              stackId="a"
              fill="var(--color-mean)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="median"
              stackId="a"
              fill="var(--color-median)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="mode"
              stackId="a"
              fill="var(--color-mode)"
              radius={[4, 4, 0, 0]}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent indicator="line" hideLabel={false} />
              }
              cursor={false}
              defaultIndex={1}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hops"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={() => ""}
            />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[150px]" />}
            />
            <Line
              dataKey="trimmedMean20"
              stroke={`var(--color-trimmedMean20)`}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="trimmedMean40"
              stroke={`var(--color-trimmedMean40)`}
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
