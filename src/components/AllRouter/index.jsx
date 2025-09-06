import { useRoutes } from "react-router-dom";
import { routers } from "../Routers";

export default function AllRouter() {
  const element = useRoutes(routers);
  return <>{element}</>;
}
