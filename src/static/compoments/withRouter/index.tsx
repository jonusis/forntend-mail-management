import { useLocation, useNavigate } from "react-router-dom";

export function withRouter( Child: any ) {
    return ( props: JSX.IntrinsicAttributes ) => {
      const location = useLocation();
      const navigate = useNavigate();
      return <Child { ...props } navigate={ navigate } location={ location } />;
    }
  }