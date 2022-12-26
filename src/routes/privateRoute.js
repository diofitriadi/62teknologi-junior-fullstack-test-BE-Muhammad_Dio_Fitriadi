import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const navigation = useNavigate()
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLogin === false) {
      navigation('/', { replace: true })
    }
  }, [isLogin, navigation])
  return (children)
}

export default PrivateRoute