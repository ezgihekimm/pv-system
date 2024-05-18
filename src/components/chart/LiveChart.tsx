"use client";
import { DataPacket } from "@/store/features/liveData";
import { useAppSelector } from "@/store/hooks";
import { LineChart } from "@mui/x-charts/LineChart";

interface Props {
  title: string;
  unit: string;
  dataType: keyof DataPacket;
  displayDataCount?: number;
}

export default function LiveChart(props: Props) {
  const { title, unit, dataType, displayDataCount = 20 } = props;
  const liveData = useAppSelector((state) => state.liveData.live);
  const recordStartDate = useAppSelector(
    (state) => state.liveData.recordStartDate
  );

  const convertTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="mt-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <h3 className="card-title">
              {title} ({unit}) - {liveData[liveData.length - 1]?.[dataType]}{" "}
              {unit}
            </h3>
          </div>
          <LineChart
            colors={["#2B6BC4"]}
            xAxis={[
              {
                data: liveData
                  .slice(-displayDataCount)
                  .map((data) => data.timestamp),
                valueFormatter: (value) => convertTimestamp(value),
                colorMap: {
                  type: "piecewise",
                  thresholds: [0, recordStartDate || Infinity],
                  colors: ["blue", "blue", recordStartDate ? "red" : "blue"],
                },
              },
            ]}
            series={[
              {
                data: liveData
                  .slice(-displayDataCount)
                  .map((data) => data[dataType]),
              },
            ]}
            height={300}
            grid={{ vertical: true, horizontal: true }}
            skipAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}
