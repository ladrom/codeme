import { InputBase, Paper, Pagination } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useRef, useState} from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism.js";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
import Clipboard from "./Clipboard.jsx";
import ThemeCode from "./ThemeCode.jsx";
import Nothing from "./Nothing.jsx";
import Screenshot from "./Screenshot.jsx";
import {readCodeData} from "../../database.js";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [theme, setTheme] = useState("light");
  const [codes, setCodes] = useState([]);
  const ToCaptureRef = useRef();

  useEffect(() => {
    readCodeData()
      .then(data => {
        setCodes(data);
      })
  }, []);

  const onSearchCode = () => {
    if (codes.length > 0 && searchValue.trim()) {
      setSearchResult(
        codes.filter(code => {
          if (code.code.toLowerCase().includes(searchValue.toLowerCase()) || code.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
          }
        })
      );
      setCurrentPage(1);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResult.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <h1>Rechercher des morceaux de code</h1>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, justifyContent: 'center', margin: '10px auto' }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchCode();
          }
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Rechercher des morceaux de code"
          inputProps={{ 'aria-label': 'Rechercher des morceaux de code' }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton
          type="button" sx={{ p: '10px' }}
          aria-label="search"
          onClick={onSearchCode}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {currentPosts.length > 0 ? currentPosts.map(result => (
        <div
          key={result.title}
        >
          <h2>{result.title}</h2>
          <div
            className="code__container code__container--search"
            ref={ToCaptureRef}
          >
            <SyntaxHighlighter
              language={result.language}
              style={theme === "light" ? prism : dark}
              className="code"
              wrapLines={true}
              wrapLongLines={true}
            >
              {`${result.code}`}
            </SyntaxHighlighter>
            <Clipboard code={result.code} />
            <ThemeCode theme={theme} setTheme={setTheme} />
            <Screenshot ToCaptureRef={ToCaptureRef} />
          </div>
        </div>
      )) : (
        <Nothing />
      )}
      {searchResult.length > postsPerPage && (
        <div className="pagination__container">
          <Pagination
            sx={{m: 'auto'}}
            color="primary"
            count={Math.ceil(searchResult.length / postsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default Search;
