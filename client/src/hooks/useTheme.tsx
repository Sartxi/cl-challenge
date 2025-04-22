import { useEffect, useState } from "react";

export default function useTheme() {
  const [isDark, setIsDark] = useState<boolean>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, setIsDark };
}
