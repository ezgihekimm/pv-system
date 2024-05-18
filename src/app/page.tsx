"use client";

import LiveChart from "@/components/chart/LiveChart";
import { useSocket } from "@/components/common/SocketProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Recording from "../components/common/Recording";
import { store } from "../store";
import { setRecording } from "../store/features/liveData";
import { SavedDataPacket, saveExperiment } from "../store/features/savedData";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isRecording = useAppSelector((state) => state.liveData.isRecording);
  const { sendMessage } = useSocket();

  const [experimentName, setExperimentName] = useState<string>("");
  const [openSolarPanel, setOpenSolarPanel] = useState<boolean>(true);
  const [openBattery, setOpenBattery] = useState<boolean>(true);
  const [openLoad, setOpenLoad] = useState<boolean>(true);

  const startRecording = () => {
    if (isRecording) return;
    if (!experimentName) {
      setExperimentName(`Experiment ${Date.now()}`);
    }

    sendMessage({
      load: openLoad,
      battery: openBattery,
      panel: openSolarPanel,
    });

    dispatch(setRecording(true));
  };

  const stopRecording = () => {
    alert("Experiment saved!");

    // Prepare data for saving
    const allData = store.getState().liveData.live;
    // Filter data for the current experiment (after recordStartDate)
    const experimentData = allData.filter(
      (data) =>
        data.timestamp >= (store.getState().liveData.recordStartDate || 0)
    );

    const savedPacket: SavedDataPacket = {
      id: uuidv4(),
      experimentName,
      recordingStartDate: store.getState().liveData.recordStartDate || 0,
      recordingStopDate: experimentData[experimentData.length - 1].timestamp,
      data: experimentData,
      states: {
        solarPanel: openSolarPanel,
        battery: openBattery,
        load: openLoad,
      },
    };
    dispatch(saveExperiment(savedPacket));
    dispatch(setRecording(false));

    router.push("/saved");
  };

  return (
    <main style={{ paddingBottom: "100px" }}>
      <div className="container-xl mt-3">
        <div className="row">
          <div className="col-lg-6 offset-3">
            <div className="form-label">Experiment Name</div>
            <input
              type="text"
              className="form-control"
              disabled={isRecording}
              placeholder="Enter experiment name"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  startRecording();
                }
              }}
            />
            <div className="form-label" style={{ marginTop: "24px" }}>
              Open / Close
            </div>
            <label className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                disabled={isRecording}
                checked={openSolarPanel}
                onChange={(e) => setOpenSolarPanel(e.target.checked)}
              />
              <span className="form-check-label">Solar Panel</span>
            </label>
            <label className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                disabled={isRecording}
                checked={openBattery}
                onChange={(e) => setOpenBattery(e.target.checked)}
              />
              <span className="form-check-label">Battery</span>
            </label>
            <label className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                disabled={isRecording}
                checked={openLoad}
                onChange={(e) => setOpenLoad(e.target.checked)}
              />
              <span className="form-check-label">Load</span>
            </label>
          </div>
          {/* Experiment Name Text Input */}

          <div className="col-lg-6 offset-3" style={{ marginTop: "24px" }}>
            {!isRecording ? (
              <a
                href="#"
                className="btn btn-outline-primary w-100"
                onClick={startRecording}
              >
                Start Experiment
              </a>
            ) : (
              <a
                href="#"
                className="btn btn-outline-danger w-100"
                onClick={stopRecording}
              >
                Stop and Save Experiment
              </a>
            )}
          </div>
        </div>
      </div>

      {isRecording && <Recording />}

      <div className="container-xl">
        <div className="row">
          <div className="col-lg-6">
            <LiveChart title="Temperature" unit="°C" dataType={"temp"} />
          </div>
          <div className="col-lg-6">
            <LiveChart title="Irradiation" unit="%" dataType={"ldr"} />
          </div>
          <div className="col-lg-6">
            <LiveChart
              title="Battery Voltage"
              unit="V"
              dataType={"battery_voltage"}
            />
          </div>
          <div className="col-lg-6">
            <LiveChart
              title="Battery Current"
              unit="mA"
              dataType={"battery_current"}
            />
          </div>
          <div className="col-lg-6">
            <LiveChart
              title="Solar Panel Voltage"
              unit="V"
              dataType={"solar_voltage"}
            />
          </div>
          <div className="col-lg-6">
            <LiveChart
              title="Solar Panel Current"
              unit="mA"
              dataType={"solar_current"}
            />
          </div>
          <div className="col-lg-6">
            <LiveChart
              title="Load Voltage"
              unit="V"
              dataType={"load_voltage"}
            />
          </div>
          <div className="col-lg-6">
            <LiveChart
              title="Load Current"
              unit="mA"
              dataType={"load_current"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
