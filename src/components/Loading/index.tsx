export function Loading() {
  return (
    <div className="grid place-items-center h-screen bg-[#4d4949]">
      <input
        id="mimikyu"
        aria-label="Disguise is broken"
        className="mimikyu-control"
        type="checkbox"
      />
      <label htmlFor="mimikyu" className="mimikyu">
        <div className="mimikyu-head">
          <div className="mimikyu-disguise-face">
            <div className="mimikyu-disguise-eye mimikyu-disguise-eye-left mimikyu-disguise-line">
              <div className="mimikyu-disguise-line"></div>
            </div>
            <div className="mimikyu-disguise-eye mimikyu-disguise-eye-right mimikyu-disguise-line">
              <div className="mimikyu-disguise-line mimikyu-disguise-line-1"></div>
              <div className="mimikyu-disguise-line mimikyu-disguise-line-2"></div>
            </div>
            <div className="mimikyu-disguise-blush mimikyu-disguise-blush-left mimikyu-disguise-line">
              <div className="mimikyu-disguise-line"></div>
            </div>
            <div className="mimikyu-disguise-blush mimikyu-disguise-blush-right mimikyu-disguise-line">
              <div className="mimikyu-disguise-line"></div>
            </div>
            <div className="mimikyu-disguise-mouth mimikyu-disguise-mouth-1">
              <div className="mimikyu-disguise-mouth mimikyu-disguise-mouth-2">
                <div className="mimikyu-disguise-mouth mimikyu-disguise-mouth-3">
                  <div className="mimikyu-disguise-mouth mimikyu-disguise-mouth-4">
                    <div className="mimikyu-disguise-mouth mimikyu-disguise-mouth-5">
                      <div className="mimikyu-disguise-mouth mimikyu-disguise-mouth-6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mimikyu-ear mimikyu-ear-left">
            <div className="mimikyu-ear-tip"></div>
            <div className="mimikyu-ear-top"></div>
          </div>
          <div className="mimikyu-ear mimikyu-ear-right">
            <div className="mimikyu-ear-top"></div>
          </div>
        </div>
        <div className="mimikyu-body">
          <div className="mimikyu-face">
            <div className="mimikyu-eye mimikyu-eye-left"></div>
            <div className="mimikyu-eye mimikyu-eye-right"></div>
          </div>
          <div className="mimikyu-disguise-torso"></div>
          <div className="mimikyu-disguise-tail">
            <div className="mimikyu-disguise-tail-tip"></div>
          </div>
          <div className="mimikyu-disguise-frays">
            <div className="mimikyu-disguise-fray mimikyu-disguise-fray-1"></div>
            <div className="mimikyu-disguise-fray mimikyu-disguise-fray-2"></div>
            <div className="mimikyu-disguise-fray mimikyu-disguise-fray-3"></div>
            <div className="mimikyu-disguise-fray mimikyu-disguise-fray-4"></div>
            <div className="mimikyu-disguise-fray mimikyu-disguise-fray-5"></div>
            <div className="mimikyu-shadow-fray mimikyu-shadow-fray-1"></div>
            <div className="mimikyu-shadow-fray mimikyu-shadow-fray-2"></div>
            <div className="mimikyu-shadow-fray mimikyu-shadow-fray-3"></div>
            <div className="mimikyu-shadow-fray mimikyu-shadow-fray-4"></div>
          </div>
        </div>
        <div className="mimikyu-shadow"></div>
      </label>
    </div>
  );
}
