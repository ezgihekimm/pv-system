"use client";
import DataChart from "@/components/chart/DataChart";
import { SavedDataPacket } from "@/store/features/savedData";
import { useAppSelector } from "@/store/hooks";

interface Props {
  params: {
    id: string;
  };
}

export default function ViewData(props: Props) {
  const { id } = props.params;
  const savedData = useAppSelector((state) => state.savedData.saved);
  const firstExperimentId = id.split("_")[0];
  const secondExperimentId = id.split("_")[1];
  const firstExperiment = savedData.find(
    (data) => data.id === firstExperimentId
  );
  const secondExperiment = savedData.find(
    (data) => data.id === secondExperimentId
  );

  const downloadCSV = (data: SavedDataPacket) => {
    // Add Headers
    const headers = Object.keys(data.data[0]);
    const csvHeaders = headers.join(",");
    const csv = [csvHeaders];
    // Add Data
    data.data.forEach((row) => {
      const values = Object.values(row);
      const csvRow = values.join(",");
      csv.push(csvRow);
    });
    const csvString = csv.join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csvString], { type: "text/csv" }));
    a.download = `${data.experimentName}.csv`;
    a.click();
  };

  if (!firstExperiment || !secondExperiment) {
    return (
      <main>
        <div className="container-xl mt-3">
          <h2>
            Experiment not found
            <br />
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingBottom: "100px" }}>
      {/* Experiment Details Table */}
      <div className="container-xl mt-3">
        <div className="row">
          <div className="col-lg-6">
            <div className="card p-4">
              <h2 className="mb-3">{firstExperiment.experimentName}</h2>
              <table className="table" style={{ marginBottom: 0 }}>
                <tbody>
                  <tr>
                    <th scope="row">Date</th>
                    <td>
                      {new Date(
                        firstExperiment.recordingStartDate || 0
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Total Time</th>
                    <td>
                      {(
                        ((firstExperiment.recordingStopDate || 0) -
                          (firstExperiment.recordingStartDate || 0)) /
                        1000
                      ).toFixed(0)}{" "}
                      seconds
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Total Data Points</th>
                    <td>{firstExperiment.data.length}</td>
                  </tr>
                  <tr>
                    <th scope="row">Solar Panel</th>
                    <td>
                      {firstExperiment.states.solarPanel ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Battery</th>
                    <td>
                      {firstExperiment.states.battery ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "0px solid white",
                    }}
                  >
                    <th scope="row">Load</th>
                    <td>
                      {firstExperiment.states.load ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                  {/* Download CSV */}
                </tbody>
              </table>
              <button
                className="btn btn-outline-primary mt-3"
                onClick={() => downloadCSV(firstExperiment)}
              >
                Download CSV
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card p-4">
              <h2 className="mb-3">{secondExperiment.experimentName}</h2>
              <table className="table" style={{ marginBottom: 0 }}>
                <tbody>
                  <tr>
                    <th scope="row">Date</th>
                    <td>
                      {new Date(
                        secondExperiment.recordingStartDate || 0
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Total Time</th>
                    <td>
                      {(
                        ((secondExperiment.recordingStopDate || 0) -
                          (secondExperiment.recordingStartDate || 0)) /
                        1000
                      ).toFixed(0)}{" "}
                      seconds
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Total Data Points</th>
                    <td>{secondExperiment.data.length}</td>
                  </tr>
                  <tr>
                    <th scope="row">Solar Panel</th>
                    <td>
                      {secondExperiment.states.solarPanel ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Battery</th>
                    <td>
                      {secondExperiment.states.battery ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "0px solid white",
                    }}
                  >
                    <th scope="row">Load</th>
                    <td>
                      {secondExperiment.states.load ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-outline-primary mt-3"
                onClick={() => downloadCSV(secondExperiment)}
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xl">
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Temperature (°C)"
              dataType={"temp"}
              data={firstExperiment.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Temperature (°C)"
              dataType={"temp"}
              data={secondExperiment.data}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Irradiation"
              dataType={"ldr"}
              data={firstExperiment.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Irradiation"
              dataType={"ldr"}
              data={secondExperiment.data}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Battery Voltage (V)"
              dataType={"battery_voltage"}
              data={firstExperiment.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Battery Voltage (V)"
              dataType={"battery_voltage"}
              data={secondExperiment.data}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Battery Current (mA)"
              dataType={"battery_current"}
              data={firstExperiment.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Battery Current (mA)"
              dataType={"battery_current"}
              data={secondExperiment.data}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Solar Panel Voltage (V)"
              dataType={"solar_voltage"}
              data={firstExperiment.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Solar Panel Voltage (V)"
              dataType={"solar_voltage"}
              data={secondExperiment.data}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Solar Panel Current (mA)"
              dataType={"solar_current"}
              data={firstExperiment.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Solar Panel Current (mA)"
              dataType={"solar_current"}
              data={secondExperiment.data}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Load Voltage (V)"
              dataType={"load_voltage"}
              data={firstExperiment.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Load Voltage (V)"
              dataType={"load_voltage"}
              data={secondExperiment.data}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Load Current (mA)"
              dataType={"load_current"}
              data={firstExperiment.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Load Current (mA)"
              dataType={"load_current"}
              data={secondExperiment.data}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
