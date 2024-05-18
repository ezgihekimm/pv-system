"use client";
import DataChart from "@/components/chart/DataChart";
import { useAppSelector } from "@/store/hooks";

interface Props {
  params: {
    id: string;
  };
}

export default function ViewData(props: Props) {
  const { id } = props.params;
  const savedData = useAppSelector((state) => state.savedData.saved);
  const selectedData = savedData.find((data) => data.id === id);

  if (!selectedData) {
    return (
      <main>
        <div className="container-xl mt-3">
          <h2>Experiment not found</h2>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingBottom: "100px" }}>
      {/* Experiment Details Table */}
      <div className="container-xl mt-3">
        <div className="card p-4">
          <h2 className="mb-3">Experiment Details</h2>
          <table className="table" style={{ marginBottom: 0 }}>
            <tbody>
              <tr>
                <th scope="row">Experiment Name</th>
                <td>{selectedData.experimentName}</td>
              </tr>
              <tr>
                <th scope="row">Date</th>
                <td>
                  {new Date(
                    selectedData.recordingStartDate || 0
                  ).toLocaleString()}
                </td>
              </tr>
              <tr>
                <th scope="row">Total Time</th>
                <td>
                  {(
                    ((selectedData.recordingStopDate || 0) -
                      (selectedData.recordingStartDate || 0)) /
                    1000
                  ).toFixed(0)}{" "}
                  seconds
                </td>
              </tr>
              <tr>
                <th scope="row">Solar Panel</th>
                <td>
                  {selectedData.states.solarPanel ? (
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
                  {selectedData.states.battery ? (
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
                  {selectedData.states.load ? (
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
        </div>
      </div>
      <div className="container-xl">
        <div className="row">
          <div className="col-lg-6">
            <DataChart
              title="Temperature (°C)"
              dataType={"temp"}
              data={selectedData.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Irradiation"
              dataType={"ldr"}
              data={selectedData.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Battery Voltage (V)"
              dataType={"battery_voltage"}
              data={selectedData.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Battery Current (mA)"
              dataType={"battery_current"}
              data={selectedData.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Solar Panel Voltage (V)"
              dataType={"solar_voltage"}
              data={selectedData.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Solar Panel Current (mA)"
              dataType={"solar_current"}
              data={selectedData.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Load Voltage (V)"
              dataType={"load_voltage"}
              data={selectedData.data}
            />
          </div>
          <div className="col-lg-6">
            <DataChart
              title="Load Current (mA)"
              dataType={"load_current"}
              data={selectedData.data}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
