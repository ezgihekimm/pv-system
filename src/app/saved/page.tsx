"use client";
import { SavedDataPacket, deleteExperiment } from "@/store/features/savedData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function SavedData() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedData = useAppSelector((state) => state.savedData.saved);
  const reverseData = savedData.slice().reverse();

  const [selectedForCompare, setSelectedForCompare] = useState<
    SavedDataPacket[]
  >([]);

  const handleDelete = (id: string) => {
    dispatch(deleteExperiment(id));
  };

  useEffect(() => {
    if (selectedForCompare.length === 2) {
      const url = `/compare/${selectedForCompare[0].id}_${selectedForCompare[1].id}`;
      router.push(url);
    }
  }, [selectedForCompare, router]);

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
                    {/* Total Data Points */}
                    <p className="card-text">
                      Total Data Points:{" "}
                      <span style={{ fontWeight: "500" }}>
                        {data.data.length}
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
                    {selectedForCompare.length < 2 &&
                      !selectedForCompare.find(
                        (item) => item.id === data.id
                      ) && (
                        <a
                          className="btn btn-outline-primary me-3"
                          onClick={() => {
                            if (selectedForCompare.length < 2) {
                              setSelectedForCompare([
                                ...selectedForCompare,
                                data,
                              ]);
                            } else {
                              alert(
                                "You can only compare two experiments at a time."
                              );
                            }
                          }}
                        >
                          {selectedForCompare.length === 0
                            ? "Select for Compare"
                            : "Compare with " +
                              selectedForCompare[0].experimentName}
                        </a>
                      )}
                    <Link
                      prefetch={false}
                      href={"/view/" + data.id}
                      className="btn btn-primary"
                    >
                      View Data
                    </Link>
                    <a
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
