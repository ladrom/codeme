import './App.css'
import Form from "./components/Form.jsx";
import Code from "./components/Code.jsx";
import {useEffect, useState} from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import {MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";

function App() {
  const [codes, setCodes] = useState([]);
  const [selectOption, setSelectOption] = useState([]);
  const [filterFlag, setFilterFlag] = useState('');
  const [codeUnit, setCodeUnit] = useState({
    title: "",
    code: "",
    language: "javascript"
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('codes') && JSON.parse(localStorage.getItem('codes')).length > 0) {
      setCodes(JSON.parse(localStorage.getItem('codes')));
    }
    setSelectOption(getSelectOptions());
  }, []);

  useEffect(() => {
    localStorage.setItem('codes', JSON.stringify(codes));
  }, [codes]);

  function getSelectOptions() {
    const objects = JSON.parse(localStorage.getItem("codes"));
    const uniqueLanguages = new Set();

    objects.forEach((item) => {
      uniqueLanguages.add(item.language);
    });

    return Array.from(uniqueLanguages);
  }

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

  function onDeleteCode(index) {
    const updatedCodes = [...codes];
    updatedCodes.splice(index, 1);
    setCodeUnit({
      title: "",
      code: "",
      language: "javascript"
    })
    setCodes(updatedCodes);
  }

  const onEditCode = (index) => {
    setCodeUnit(codes[index]);
    setEditIndex(index);
  };

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
        {selectOption.map((item, index) => (
          <MenuItem key={index} value={item}>{item.toString().toUpperCase()}</MenuItem>
        ))}
      </TextField>
      {codes.length > 0 && (
        <>
          <h2>Code enregistré</h2>
          <Stack className="units" direction="row" spacing={1}>
            {codes.filter(item => {
              if (!filterFlag) {
                return true;
              } else {
                return filterFlag === item.language
              }
            }).map((code, index) => (
              <ButtonGroup
                variant="outlined"
                aria-label="Basic button group"
                key={index}
              >
                <Button
                  className="unit"
                  key={index}
                  color="primary"
                  onClick={() => {
                    setEditIndex(null);
                    setCodeUnit(code);
                  }}
                >
                  {code.title}
                </Button>
                <Button
                  onClick={() => onEditCode(index)}
                >
                  <EditIcon/>
                </Button>
                <Button
                  onClick={() => onDeleteCode(index)}
                >
                  <DeleteIcon/>
                </Button>
              </ButtonGroup>
            ))}
          </Stack>
        </>
      )}
    </>
  )
}

export default App
