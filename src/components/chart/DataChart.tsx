"use client";
import { DataPacket } from "@/store/features/liveData";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  dataType: keyof DataPacket;
  data?: DataPacket[];
}

export default function DataChart(props: Props) {
  const { title, dataType, data } = props;
  const [chartData, setChartData] = useState<DataPacket[]>([]);
  const convertTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        setChartData(data);
      }
    }, 10);
  }, [data]);

  return (
    <div className="mt-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <h3 className="card-title">{title}</h3>
          </div>
          <LineChart
            colors={["red"]}
            xAxis={[
              {
                data: chartData.map((data) => data.timestamp),
                valueFormatter: (value) => convertTimestamp(value),
              },
            ]}
            series={[
              {
                data: chartData.map((data) => data[dataType]),
              },
            ]}
            height={300}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
    </div>
  );
}
