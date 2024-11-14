import React, { useCallback } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { formatBytes } from "@/lib/utils"

const LineChartCard = ({
  data,
  title,
  tickFormatMd,
}: {
  data: any
  title: string
  tickFormatMd?: boolean
}) => {
  const convertedData = data.map((item: { timestamp: number; value: any }) => {
    const date = new Date(item.timestamp * 1000) // Convert timestamp to milliseconds
    const timeString = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }) // Get only hour and minute
    return {
      ...item,
      value: Number(item.value),
      date: timeString,
    }
  })

  const formatYAxis = useCallback(
    (newValue: any) => {
      return tickFormatMd ? formatBytes(newValue) : newValue
    },
    [tickFormatMd],
  )

  return (
    <Card className="max-w-[310px] flex-1 space-y-4 p-4">
      <CardTitle className="flex items-center text-white-v-600 ">
        {title}
        {/* :&nbsp;<span className="text-white">{value}% </span>{" "} */}
      </CardTitle>
      <CardContent className="h-36 !p-0 md:h-36">
        <ResponsiveContainer width="100%" height={"100%"}>
          <LineChart data={convertedData} className="">
            <XAxis dataKey="date" className="text-[10px]" />
            <YAxis
              width={30}
              height={30}
              className="h-8 w-8 text-[10px]"
              tickFormatter={(newValue) => formatYAxis(newValue)}
            />
            <defs>
              <linearGradient id="solids" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#FF9F99 ", stopOpacity: 1 }}
                />
                <stop
                  offset="33%"
                  style={{ stopColor: "#FF9F99 ", stopOpacity: 1 }}
                />
                <stop
                  offset="33%"
                  style={{ stopColor: "#FF9F99 ", stopOpacity: 1 }}
                />
                <stop
                  offset="67%"
                  style={{ stopColor: "#B4FF99", stopOpacity: 1 }}
                />
                <stop
                  offset="67%"
                  style={{ stopColor: "#B4FF99", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: " #B4FF99", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dot={false}
              dataKey="value"
              stroke="url(#solids)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default LineChartCard
