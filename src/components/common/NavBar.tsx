"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function Navbar() {
  const router = useRouter();
  const isConnected = useAppSelector((state) => state.liveData.isConnected);
  const isRecording = useAppSelector((state) => state.liveData.isRecording);

  return (
    <header className="">
      <div className="">
        <Script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/js/tabler.min.js"></Script>
        <div className="page bg-white ">
          <div className="sticky-top">
            <header className="navbar navbar-expand-md sticky-top d-print-none border-bottom bg-white">
              <div className="container-xl">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbar-menu"
                  aria-controls="navbar-menu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                  <Image
                    src="/bau.svg"
                    width={400}
                    height={400}
                    alt="Tabler"
                    className="navbar-brand-image"
                  />
                </h1>
                <div className="navbar-nav flex-row order-md-last">
                  <div className="nav-item d-none d-md-flex">
                    {isConnected ? (
                      <span
                        className="badge bg-green text-green-fg"
                        style={{
                          height: "36px",
                          lineHeight: "28px",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          marginRight: "12px",
                          fontSize: "13px",
                        }}
                      >
                        Socket Connected
                      </span>
                    ) : (
                      <span
                        className="badge bg-red text-red-fg"
                        style={{
                          height: "36px",
                          lineHeight: "28px",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          marginRight: "12px",
                          fontSize: "13px",
                        }}
                      >
                        Socket Disconnected
                      </span>
                    )}
                  </div>
                  <div className="nav-item d-none d-md-flex">
                    <div className="btn-list">
                      <div className="btn">PV System Experimental Setup-3</div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <header className="navbar-expand-md border-bottom">
              <div className="collapse navbar-collapse" id="navbar-menu">
                <div className="navbar">
                  <div className="container-xl">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <div
                          className="nav-link"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (!isRecording) {
                              router.push("/");
                            } else {
                              alert(
                                "Please stop recording before going to home page"
                              );
                            }
                          }}
                        >
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                            </svg>
                          </span>
                          <span className="nav-link-title">Home Page</span>
                        </div>
                      </li>
                      <li className="nav-item">
                        <div
                          className="nav-link"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (!isRecording) {
                              router.push("/saved");
                            } else {
                              alert(
                                "Please stop recording before going to saved data page"
                              );
                            }
                          }}
                        >
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                              <path d="M12 12l8 -4.5" />
                              <path d="M12 12l0 9" />
                              <path d="M12 12l-8 -4.5" />
                              <path d="M16 5.25l-8 4.5" />
                            </svg>
                          </span>
                          <span className="nav-link-title">Saved Data</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>
    </header>
  );
}
