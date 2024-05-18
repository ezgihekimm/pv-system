import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export default function Recording() {
  const recordStartDate = useAppSelector(
    (state) => state.liveData.recordStartDate
  );
  const [recordedSeconds, setRecordedSeconds] = useState<number>(0);

  const displayTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRecordedSeconds(
        Math.floor((Date.now() - (recordStartDate || 0)) / 1000)
      );
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div
      className="row"
      style={{
        marginTop: "24px",
        marginBottom: "24px",
      }}
    >
      <div
        className="col-lg-6 offset-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Red Dot */}
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "red",
          }}
        ></div>
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "red",
            fontWeight: "600",
          }}
        >
          Recording {displayTime(recordedSeconds)}
        </div>
      </div>
    </div>
  );
}
