import { Navigate } from "react-router-dom";
import { useAuth } from "./../../context/auth/index";

import style from "./style.module.css";
import Button from "./../../components/Button/index";

const Home = () => {
  const {
    state: { user, isLoggedIn },
    logout,
  } = useAuth();

  if (!isLoggedIn) return <Navigate replace to="/" />;
  return (
    <div className={style.container}>
      <p>
        Hello, <strong>{user?.full_name}</strong>
      </p>
      <Button onClick={logout} variant="danger">
        Logout
      </Button>
    </div>
  );
};

export default Home;
