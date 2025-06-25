import { useLocalStorageState } from "../hooks/useLocalStorageState";
import DarkModeContext from "./darkModeContext";

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
    , 'isDarkMode');

  return (
    <DarkModeContext.Provider value={{
      isDarkMode,
      toggleDarkMode: () => setIsDarkMode(prevState => !prevState)
    }}>
      {children}
    </DarkModeContext.Provider>
  )
}


