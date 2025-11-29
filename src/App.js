//import React from 'react';
//import KashafPortfolio from './KashafPortfolio';

//function App() {
  //return <KashafPortfolio />;
//}

//export default App;

// src/App.js
/*
import './App.css';
import React from 'react';
import BackgroundFX from './BackgroundFX';
import KashafPortfolio from './KashafPortfolio'; // or your Router/pages

export default function App() {
  return (
    <>
      <BackgroundFX />
      {/* Everything else sits above it */ /*} 
      <div style={{ position: 'relative', zIndex: 2 }}>
        <KashafPortfolio />
      </div>
    </>
  );
}
*/

/*
// src/App.js
import './App.css';
import React from 'react';
import BackgroundFX from './BackgroundFX';
import InfraVisionProject from './InfraVisionProject'; // ⬅️ new

export default function App() {
  return (
    <>
      <BackgroundFX />
      {/* Everything else sits above it *//*}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <InfraVisionProject />   {/* ⬅️ was <KashafPortfolio /> *//*}
      </div>
    </>
  );
}
*/

import './App.css';
import React from 'react';
import BackgroundFX from './BackgroundFX';
import KashafPortfolio from './KashafPortfolio';
//import InfraVisionProject from './InfraVisionProject';

export default function App() {
  return (
    <>
      <BackgroundFX />
      {/* Everything else sits above it */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <KashafPortfolio />
        {/* <InfraVisionProject /> */}
      </div>
    </>
  );
}

