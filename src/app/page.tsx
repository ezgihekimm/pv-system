import Temperature from "./temperature";
import Light from "./light";
export default function Home() {
  return (
    <main className="">
      <div className="container-xl mt-3">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-label">Open / Close</div>
            <label className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <span className="form-check-label">Solar Panel</span>
            </label>
            <label className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <span className="form-check-label">Battery</span>
            </label>
            <label className="form-check form-switch">
              <input className="form-check-input" type="checkbox" />
              <span className="form-check-label">Load</span>
            </label>
          </div>
          <div className="col-lg-12">
            <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
              <a href="#" className="btn btn-outline-primary w-100">
                Start Experiment
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xl">
        <div className="row">
          <div className="col-lg-6">
            <Temperature />
          </div>
          <div className="col-lg-6">
            <Light />
          </div>
          </div>
      </div>
    </main>
  );
}
