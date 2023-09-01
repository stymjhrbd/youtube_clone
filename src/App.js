import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';


import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';

const App = () => (
  <GoogleOAuthProvider clientId="491769718001-084coi6l5j3uv5tjjg439q30raa0m5jh.apps.googleusercontent.com">
  <BrowserRouter>
    <Box sx={{ backgroundColor: '#000' }}>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Feed />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
      </Routes>
    </Box>
  </BrowserRouter>
  </GoogleOAuthProvider>
);

export default App;
