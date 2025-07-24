"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Dot,
  type RechartsFunction,
} from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Define a type for the chart components
type ChartComponent =
  | typeof LineChart
  | typeof BarChart
  | typeof AreaChart
  | typeof PieChart
  | typeof RadialBarChart
  | typeof ScatterChart

// Define a type for the chart elements
type ChartElement =
  | typeof Line
  | typeof Bar
  | typeof Area
  | typeof Pie
  | typeof RadialBar
  | typeof Scatter
  | typeof XAxis
  | typeof YAxis
  | typeof CartesianGrid
  | typeof Dot

// Map of chart types to their components
const chartComponents: Record<string, ChartComponent> = {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  RadialBarChart,
  ScatterChart,
}

// Map of chart element types to their components
const chartElements: Record<string, ChartElement> = {
  Line,
  Bar,
  Area,
  Pie,
  RadialBar,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Dot,
}

interface ChartProps extends React.ComponentProps<typeof ChartContainer> {
  config: ChartConfig
  data: Record<string, any>[]
  chartType: keyof typeof chartComponents
  chartElements: Array<{
    type: keyof typeof chartElements
    props: Record<string, any>
  }>
  tooltip?: boolean
  grid?: boolean
  xAxis?: boolean
  yAxis?: boolean
  customTooltip?: React.ComponentType<any>
  customDot?: RechartsFunction
}

export const Chart: React.FC<ChartProps> = ({
  config,
  data,
  chartType,
  chartElements: elements,
  tooltip = true,
  grid = false,
  xAxis = false,
  yAxis = false,
  customTooltip,
  customDot,
  className,
  ...props
}) => {
  const ChartComponent = chartComponents[chartType]

  if (!ChartComponent) {
    console.error(`Unknown chart type: ${chartType}`)
    return null
  }

  return (
    <ChartContainer config={config} className={cn("min-h-[200px] w-full", className)} {...props}>
      <ChartComponent data={data}>
        {grid && <CartesianGrid />}
        {xAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />}
        {yAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} />}
        {elements.map((element, index) => {
          const ElementComponent = chartElements[element.type]
          if (!ElementComponent) {
            console.error(`Unknown chart element type: ${element.type}`)
            return null
          }
          return <ElementComponent key={index} dot={customDot || element.props.dot} {...element.props} />
        })}
        {tooltip && (
          <ChartTooltip content={customTooltip ? React.createElement(customTooltip) : <ChartTooltipContent />} />
        )}
      </ChartComponent>
    </ChartContainer>
  )
}
