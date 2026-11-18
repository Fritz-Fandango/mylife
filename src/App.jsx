// Import styles
import CssBaseline from "@mui/material/CssBaseline";

// Import MyLife components
import MyLifeBody from "./components/mylifebody/MyLifeBody";
import MyLifeFooter from "./components/mylifefooter/MyLifeFooter";
import MyLifeHeader from "./components/mylifeheader/MyLifeHeader";

function App() {
  return (
    <>
      <CssBaseline />
      <MyLifeHeader />
      <MyLifeBody />
      <MyLifeFooter />
    </>
  );
}

export default App;
