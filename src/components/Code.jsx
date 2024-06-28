import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Clipboard from "./Clipboard.jsx";
import PropTypes from "prop-types";
import ThemeCode from "./ThemeCode.jsx";
import {useState} from "react";

function Code({ codeUnit }) {
  const [theme, setTheme] = useState("light");
  return (
    <div className="code__container">
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