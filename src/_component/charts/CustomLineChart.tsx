import {CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip} from "recharts";

export interface LineKey {
  key: string,
  name?: string,
  color: string
}
interface LineChartProps {
  data: any[];
  lineKeys: LineKey[];
  xAxisKey: string;
}

export default function CustomLineChart(props: LineChartProps) {
  return (
    <ResponsiveContainer aspect={3} width={"100%"}>
      <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={props.xAxisKey}/>
        <YAxis/>
        <Tooltip/>
        {props.lineKeys.map((lineKey: LineKey) => (
          <Line
            key={lineKey.key}
            type={"monotone"}
            dataKey={lineKey.key}
            name={lineKey?.name}
            stroke={lineKey.color}
            activeDot={{r: 8}}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}