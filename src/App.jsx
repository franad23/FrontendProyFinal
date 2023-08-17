import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Context
import { AuthProvider } from './context/AuthContext';

//Components
import BuildFormView from './Views/BuildFormView/BuildFormView';
import FinalFormToResponse from './Views/FinalFormToResponse/FinalFormToResponse';
import ModifyBuildFormView from './Views/ModifyBuildFormView/ModifyBuildFormView';
import Userdashboard from './Views/Userdashboard/Userdashboard';
import LoginPage from './Views/LoginView/LoginPage';
import RegisterPage from './Views/RegisterView/RegisterPage';
import LadingPage from './Views/LandingPage/LadingPage';
import InfoVerifyEmail from './Views/InfoVerifyEmail/InfoVerifyEmail';
import ToVerifyEmail from './Views/ToVerifyEmail/ToVerifyEmail';
import RecoveryPassword from './Views/RecoveryPassword/RecoveryPassword';
import RecoveryPasswordPage from './Views/RecoveryPasswordPage/RecoveryPasswordPage';
import Error404 from './Views/Error404Page/Error404';

import ProtectedRoutes from './ProtectedRoutes';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LadingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/infoverifyemail" element={<InfoVerifyEmail />} />
          <Route path="/final-form/:id" element={<FinalFormToResponse />} />
          <Route path="/toverifyemail/:id" element={<ToVerifyEmail />} />
          <Route path="/recoverypassword" element={<RecoveryPassword />} />
          <Route path="/recoverypasswordpage/:id" element={<RecoveryPasswordPage />} />
          <Route path="/error" element={<Error404 />} />

          <Route element={<ProtectedRoutes/>}>
            <Route path="/userdashboard" element={<Userdashboard />} />
            <Route path="/build-form/:id" element={<BuildFormView />} />
            <Route path="/modify-form/:id" element={<ModifyBuildFormView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
