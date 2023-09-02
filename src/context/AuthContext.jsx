import { createContext, useState, useContext, useEffect} from 'react';
import { useCookies } from "react-cookie";


//API 
import { registerUser, loginUser } from '../api/formOptions';
import { verifyToken } from '../api/verifyToken';
import { logoutuser } from '../api/formOptions';


export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context){
    throw new Error ("Deberia estar dentro de un AuthProvider")
  }
  return context
}


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [, , removeCookie] = useCookies(["token"]);

  const signup = async (user) => {
    try {
      const res = await registerUser(user);
      // setIsAuth(true);
      // setUser(res.data);
      return (res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const signin = async (user) => {
    try {
      const res = await loginUser(user);
      setIsAuth(true);
      setUser(res.data.user);
      return (res.data.token);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const logout = async () => {
    const res = await logoutuser();
    removeCookie("token");
    setIsAuth(false);
    setUser(null);
  }

  useEffect(() => {
    const verifyTokenFromBack = async () => {
      const token = cookies.token;
    if (token) {
      try {
        const res = await verifyToken(token);
        if (!res.data) {
          setIsAuth(false);
          setUser(null);
          setLoading(false);
          return;
        }
        setIsAuth(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
      }
    }else {
      setLoading(false);
    }
    }
    verifyTokenFromBack();
  }, [])
  
  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      user, 
      isAuth,
      loading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
