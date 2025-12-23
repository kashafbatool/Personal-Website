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


import './App.css';
import React from 'react';
import BackgroundFX from './BackgroundFX';
import KashafPortfolio from './KashafPortfolio';
import InfraVisionProject from './InfraVisionProject';

export default function App() {
  return (
    <>
      <BackgroundFX />
      {/* Everything else sits above it *//*}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <KashafPortfolio />
        {/* <InfraVisionProject /> *//*}
      </div>
    </>
  );
}


import './App.css';
import React from 'react';
import BackgroundFX from './BackgroundFX';
import InfraVisionProject from './InfraVisionProject';
import KashafPortfolio from './KashafPortfolio';

export default function App() {
  const basePath = process.env.PUBLIC_URL || '';
  const normalizedPath = window.location.pathname.replace(basePath, '') || '/';
  const isInfraVisionPage = normalizedPath.startsWith('/projects/infra-vision');

  if (isInfraVisionPage) {
    return (
      <>
        <BackgroundFX />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <InfraVisionProject />
        </div>
      </>
    );
  }

  return <KashafPortfolio />;
}

*/


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KashafPortfolio from './KashafPortfolio';
import BackgroundFX from './BackgroundFX';
import InfraVisionProject from './InfraVisionProject';
import LocalLinkProject from './LocalLinkProject';

export default function App() {
  const basePath = process.env.PUBLIC_URL || '';
  const pathname = window.location.pathname;
  const normalizedPath = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;
  const projectRoutes = {
    '/projects/infra-vision': InfraVisionProject,
    '/projects/local-link': LocalLinkProject
  };

  const matchedProject = Object.entries(projectRoutes).find(([route]) => {
    return normalizedPath === route || normalizedPath.startsWith(`${route}/`);
  });

  if (matchedProject) {
    const ProjectComponent = matchedProject[1];
    return (
      <>
        <BackgroundFX />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <ProjectComponent />
        </div>
      </>
    );
  }

  return <KashafPortfolio />;
}