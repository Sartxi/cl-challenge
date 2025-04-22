import './toast.css';

import { useContext, useEffect } from "react";
import { DataContext } from "../../App";

export default function Toast() {
  const { toast, setToast } = useContext(DataContext);

  useEffect(() => {
    setTimeout(() => {
      setToast?.(null);
    }, toast?.duration);
  }, [toast, setToast]);

  if (!toast) return <span />;

  return (
    <div className={`toast ${toast.status}`}>
      {toast.text}
    </div>
  )
}
