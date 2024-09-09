"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
} satisfies ChartConfig;

export default function Chart({ chartData }: { chartData: any }) {
  return (
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle>40 Hops Mead Test</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="hops"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={() => ""}
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
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
              defaultIndex={1}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
