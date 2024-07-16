import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Clipboard from "./Clipboard.jsx";
import PropTypes from "prop-types";
import ThemeCode from "./ThemeCode.jsx";
import {useEffect, useRef, useState} from "react";
import Screenshot from "./Screenshot.jsx";

function Code({ codeUnit }) {
  const [theme, setTheme] = useState("light");
  const ToCaptureRef = useRef();

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"))
    }
  }, [])

  return (
    <div
      className="code__container"
    >
      {codeUnit.code !== "" && (
        <div ref={ToCaptureRef}>
          <SyntaxHighlighter
            language={codeUnit.language}
            style={theme === "light" ? prism : dark}
            className="code"
            wrapLines={true}
            wrapLongLines={true}

          >
            {`${codeUnit.code}`}
          </SyntaxHighlighter>
          <Clipboard code={codeUnit.code}/>
          <ThemeCode theme={theme} setTheme={setTheme}/>
          <Screenshot ToCaptureRef={ToCaptureRef} />
        </div>
      )}
    </div>
  )
}

Code.propTypes = {
  codeUnit: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
    language: PropTypes.string,
  }).isRequired,
};

export default Code;