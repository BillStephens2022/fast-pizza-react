import { useNavigate, Link } from "react-router-dom";


export default function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = "text-sml text-blue-500 hover:text-blue-600 hover:underline";

  if (to === "-1")
    return <button className={className} onClick={() => navigate(-1)}>{children}</button>;

  return (
    <Link
      to={to}
      className={className}
    >
      {children}
    </Link>
  );
}
