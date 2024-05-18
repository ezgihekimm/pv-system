"use client";
import { deleteExperiment } from "@/store/features/savedData";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function SavedData() {
  const dispatch = useAppDispatch();
  const savedData = useAppSelector((state) => state.savedData.saved);
  const reverseData = savedData.slice().reverse();

  const handleDelete = (id: string) => {
    dispatch(deleteExperiment(id));
  };

  return (
    <div>
      {reverseData.length > 0 && (
        <div className="container-xl mt-3">
          <h2 className="mb-3">Saved Experiments</h2>
          <div className="row">
            {reverseData.map((data, index) => (
              <div className="col-lg-12 mb-3" key={index}>
                <div
                  className="card"
                  style={{ paddingTop: "8px", paddingBottom: "8px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "24px" }}>
                      {data.experimentName}
                    </h5>
                    <p className="card-text">
                      Date:{" "}
                      <span style={{ fontWeight: "500" }}>
                        {new Date(data.recordingStartDate).toLocaleString()}
                      </span>
                    </p>
                    <p className="card-text">
                      Total Time:{" "}
                      <span style={{ fontWeight: "500" }}>
                        {(
                          (data.recordingStopDate - data.recordingStartDate) /
                          1000
                        ).toFixed(0)}{" "}
                        seconds
                      </span>
                    </p>
                    {/* Open Close */}
                    <p className="card-text">
                      Solar Panel:{" "}
                      {data.states.solarPanel ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </p>
                    <p className="card-text">
                      Battery:{" "}
                      {data.states.battery ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </p>
                    <p className="card-text">
                      Load:{" "}
                      {data.states.load ? (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Open
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          Closed
                        </span>
                      )}
                    </p>
                    <a href="#" className="btn btn-outline-primary">
                      Compare Data
                    </a>
                    <Link
                      prefetch={false}
                      href={"/view/" + data.id}
                      className="btn btn-primary ms-3"
                    >
                      View Data
                    </Link>
                    <a
                      href="#"
                      className="btn btn-danger ms-3"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {savedData.length === 0 && (
        <div className="container-xl mt-3">
          <h2 className="mb-3">No Saved Experiments</h2>
        </div>
      )}
    </div>
  );
}
