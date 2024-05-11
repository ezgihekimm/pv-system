'use client'
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Light() {
  const [chartData, setChartData] = React.useState({
    xAxis: [{ data: [1, 2, 3, 5, 8, 10] }],
    series: [{ data: [2, 5.5, 2, 8.5, 1.5, 5] }],
  });

  const updateChartData = () => {
    // Yeni verileri burada oluşturun veya API'den alın
    const newData = {
      xAxis: [{ data: [1, 2, 3, 4, 5, 6] }],
      series: [{ data: [3, 6, 3, 7, 2, 6] }],
    };
    // setChartData ile state'i güncelle
    setChartData(newData);
  };

  // Örneğin, herhangi bir olay tetiklendiğinde verileri güncellemek için bu fonksiyonu kullanabilirsiniz.
  // Bu sadece bir örnektir ve ihtiyaca göre değiştirilebilir.
  React.useEffect(() => {
    // Örneğin, bileşen yüklendiğinde veya belirli bir süre sonra verileri güncelleme
    const interval = setInterval(updateChartData, 5000); // Örneğin, her 5 saniyede bir güncelle

    // Komponent temizlendiğinde interval'i temizle
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex">
              <h3 className="card-title">Current</h3>
            </div>
            <LineChart
              colors={["#2B6BC4"]}
              xAxis={chartData.xAxis}
              series={chartData.series}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
      </div>
    </div>
  );
}
