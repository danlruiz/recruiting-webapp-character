import { useEffect, useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

function App() {
  const [attributes, setAttributes] = useState(
    ATTRIBUTE_LIST.reduce((obj, attribute) => {
      obj[attribute] = 0;
      return obj;
    }, {})
  );

  const incAttr = (attr) => {
    setAttributes({
      ...attributes,
      [attr]: (attributes[attr] += 1),
    });
  };

  const decAttr = (attr) => {
    setAttributes({
      ...attributes,
      [attr]: (attributes[attr] -= 1),
    });
  };

  const [canUseClass, setCanUseClass] = useState({
    Barbarian: false,
    Wizard: false,
    Bard: false,
  });

  const hasMinReq = (charCls) => {
    let hasMin = true;
    ATTRIBUTE_LIST.map((attr) => {
      hasMin = hasMin && attributes[attr] >= CLASS_LIST[charCls][attr];
    });

    return hasMin;
  };

  useEffect(() => {
    let canUseClsBucket = {};
    ["Barbarian", "Wizard", "Bard"].reduce((obj, attribute) => {
      obj[attribute] = hasMinReq(attribute);
      return obj;
    }, canUseClsBucket);

    setCanUseClass(canUseClsBucket);
  }, [attributes]);

  const [showMinStats, setShowMinStats] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="container">
          <div id="attributes" className="box">
            {Object.keys(attributes).map((attr, idx) => {
              return (
                <div key={idx}>
                  {attr}: {attributes[attr]}
                  <button
                    onClick={() => {
                      incAttr(attr);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      decAttr(attr);
                    }}
                  >
                    -
                  </button>
                </div>
              );
            })}
          </div>
          <div id="character-classes" className="box">
            {Object.keys(CLASS_LIST).map((attr, key) => {
              return (
                <div
                  className="character-class-link"
                  style={{ fontWeight: canUseClass[attr] ? "bold" : "normal" }}
                  onClick={() => setShowMinStats(attr)}
                >
                  {attr}
                </div>
              );
            })}
          </div>
          {showMinStats && (
            <div id="min-stats" className="box">
              {showMinStats} selected
              <ul>
                {Object.keys(CLASS_LIST[showMinStats]).map((attr) => (
                  <li>
                    {attr} : {CLASS_LIST[showMinStats][attr]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
