import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

function ThemeCode({ theme, setTheme }) {
  function onThemeChange() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light")
    }
  }

  return (
    <div className="theme__button">
      <IconButton onClick={onThemeChange}>
        {theme === "light" ? (
          <DarkModeIcon color="warning" />
        ) : (
          <LightModeIcon color="warning" />
        )}

      </IconButton>
    </div>
  )
}

ThemeCode.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func,
}

export default ThemeCode;