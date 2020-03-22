import React from 'react';

// Import styles
import CssBaseline from '@material-ui/core/CssBaseline';

// Import MyLife components
import MyLifeHeader from './components/mylifeheader/MyLifeHeader';
import MyLifeBody from './components/mylifebody/MyLifeBody';
import MyLifeFooter from './components/mylifefooter/MyLifeFooter';

function App() {
  return (
    <>
      <CssBaseline />
      <MyLifeHeader />
      {/* <MyLifeBody /> */}
      <MyLifeFooter />
    </>
  );
}

export default App;
