import './App.css'
import Form from "./components/Form.jsx";
import Code from "./components/Code.jsx";
import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import {MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import {readCodeData} from "../database.js";
import CodeList from "./components/CodeList.jsx";

function App() {
  const [codes, setCodes] = useState([]);
  const [filterFlag, setFilterFlag] = useState('');
  const [codeUnit, setCodeUnit] = useState({
    title: "",
    code: "",
    language: "javascript"
  });
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    readCodeData()
      .then(data => {
        setCodes(data);
      })
  }, [])

  const onSelectOptionChange = (e) => {
    setFilterFlag(e.target.value)
  }

  function onAddBlank() {
    setCodeUnit({
      title: "",
      code: "",
      language: "javascript"
    });
    setEditIndex(null);
  }

  return (
    <>
      <h1 className="title">CodeMe</h1>
      <IconButton
        color="primary"
        className="add__button"
        onClick={onAddBlank}
      >
        <AddIcon />
      </IconButton>
      <div className="container">
        <Form
          codes={codes}
          setCodes={setCodes}
          codeUnit={codeUnit}
          setCodeUnit={setCodeUnit}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />
        <Code codeUnit={codeUnit} />
      </div>

      <h2>Sélection du code par langage de programmation</h2>
      <TextField
        className="codeSelect"
        id="filled-select-currency"
        select
        label="Langage"
        defaultValue=""
        helperText="Trier le code enregistré par langage de programmation"
        variant="filled"
        fullWidth
        onChange={onSelectOptionChange}
        value={filterFlag}
      >
        <MenuItem value="">Tous les langages</MenuItem>
        {codes.map((item, index) => (
          <MenuItem key={index} value={item.language}>{item.language.toString().toUpperCase()}</MenuItem>
        ))}
      </TextField>
      {codes.length > 0 && (
        <CodeList
          codes={codes}
          setCodes={setCodes}
          filterFlag={filterFlag}
          setEditIndex={setEditIndex}
          setCodeUnit={setCodeUnit}
          setFilterFlag={setFilterFlag}
        />
      )}
    </>
  )
}

export default App
