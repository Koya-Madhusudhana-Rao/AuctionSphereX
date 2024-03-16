import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductInfo from "./pages/ProductInfo";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ/faq";
import React from 'react';
import ForgotPassword from "./pages/Login/forgotpassword";
import TestMain from "./pages/Main/mainhome";


function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
      <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage><Home /></ProtectedPage>
            }
          />
          <Route
            path="/product/:id"
            element={<ProtectedPage><ProductInfo /></ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={<ProtectedPage><Profile /></ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={<ProtectedPage><Admin /></ProtectedPage>
            }
          />
          {/* <Route exact path="/test" component={<Main/>} /> */}
          <Route path="/main" element={<TestMain/>}/>
          {/* <Route path="/main" element={<Main />} /> */}
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage><Home /></ProtectedPage>
            }
          />
          <Route
            path="/product/:id"
            element={<ProtectedPage><ProductInfo /></ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={<ProtectedPage><Profile /></ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={<ProtectedPage><Admin /></ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
