import UserContextProvider from "./containers/context/UserContext";
import AdministratorProvider from "./containers/context/AdministratorContext";
import { Routes, Route } from "react-router-dom";

import Home from "./containers/Home/Home";
import Header from "./components/header/Navbar";
import Login from "./containers/Login/Login";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Module from "./containers/Module/Module";
import User from "./containers/Users/User";
import Sensors from "./containers/Sensors/Sensors";
import RegisterEditModule from "./containers/Module/RegisterEditModule";
import UserRegisterUpd from "./containers/Register/UserRegisterUpd";
import UserUpdatePass from "./containers/Users/UserUpdatePass";
import TablePDF from "./containers/PDF/TablePDF";
import Loading from "./components/Loading/Loading";
import Settings from "./containers/Settings/Settings";

function App() {
  return (
    <UserContextProvider>
      <AdministratorProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/modules" element={<Module />} />
          <Route path="/modules/regedit" element={<RegisterEditModule />} />
          <Route path="/users" element={<User />} />
          <Route path="/users/regedit" element={<UserRegisterUpd />} />
          <Route path="/users/editpass" element={<UserUpdatePass />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/print/table" element={<TablePDF />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AdministratorProvider>
    </UserContextProvider>
  );
}

export default App;
