import Image from "next/image";
import Script from "next/script";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="">
      <div className="">
        <Script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/js/tabler.min.js"></Script>
        <div className="page bg-white ">
          <div className="sticky-top">
            <header className="navbar navbar-expand-md sticky-top d-print-none border-bottom">
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
                  <a href="/">
                    <Image
                      src="/bau.svg"
                      width={400}
                      height={400}
                      alt="Tabler"
                      className="navbar-brand-image"
                    />
                  </a>
                </h1>
                <div className="navbar-nav flex-row order-md-last">
                  <div className="nav-item d-none d-md-flex">
                    <div className="btn-list">
                      <a
                        href="/"
                        className="btn"
                        rel="noreferrer"
                      >
                        PV System Experimental Setup-3
                      </a>
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
                        <a className="nav-link" href="/">
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
                        </a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/products">
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
        <div
          className="modal modal-blur fade"
          id="modal-report"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New report</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="example-text-input"
                    placeholder="Your report name"
                  />
                </div>
                <label className="form-label">Report type</label>
                <div className="form-selectgroup-boxes row mb-3">
                  <div className="col-lg-6">
                    <label className="form-selectgroup-item">
                      <input
                        type="radio"
                        name="report-type"
                        value="1"
                        className="form-selectgroup-input"
                        checked
                      />
                      <span className="form-selectgroup-label d-flex align-items-center p-3">
                        <span className="me-3">
                          <span className="form-selectgroup-check"></span>
                        </span>
                        <span className="form-selectgroup-label-content">
                          <span className="form-selectgroup-title strong mb-1">
                            Simple
                          </span>
                          <span className="d-block text-muted">
                            Provide only basic data needed for the report
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-selectgroup-item">
                      <input
                        type="radio"
                        name="report-type"
                        value="1"
                        className="form-selectgroup-input"
                      />
                      <span className="form-selectgroup-label d-flex align-items-center p-3">
                        <span className="me-3">
                          <span className="form-selectgroup-check"></span>
                        </span>
                        <span className="form-selectgroup-label-content">
                          <span className="form-selectgroup-title strong mb-1">
                            Advanced
                          </span>
                          <span className="d-block text-muted">
                            Insert charts and additional advanced analyses to be
                            inserted in the report
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="mb-3">
                      <label className="form-label">Report url</label>
                      <div className="input-group input-group-flat">
                        <span className="input-group-text">
                          https://tabler.io/reports/
                        </span>
                        <input
                          type="text"
                          className="form-control ps-0"
                          value="report-01"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Visibility</label>
                      <select className="form-select">
                        <option value="1" selected>
                          Private
                        </option>
                        <option value="2">Public</option>
                        <option value="3">Hidden</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Client name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Reporting period</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div>
                      <label className="form-label">
                        Additional information
                      </label>
                      <textarea className="form-control" rows={3}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <a
                  href="#"
                  className="btn btn-link link-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </a>
                <a
                  href="#"
                  className="btn btn-primary ms-auto"
                  data-bs-dismiss="modal"
                >
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                  Create new report
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
