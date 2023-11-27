import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import NoAccessPage from "../containers/NoAccessPage/NoAccessPage";
interface GuardedRouteProps {
  component: React.FC<{editMode: boolean;}>;
  editMode:boolean;
}

export const RouteGuard: React.FC<GuardedRouteProps> = ({
  component: Component,
  editMode,
  
}) => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Component editMode={editMode} />;
  } else {
    return <NoAccessPage />;
  }
};
