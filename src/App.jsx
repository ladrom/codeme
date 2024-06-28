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

function App() {
  const [codes, setCodes] = useState([]);
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
  }, []);

  useEffect(() => {
    localStorage.setItem('codes', JSON.stringify(codes));
  }, [codes]);

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
    localStorage.setItem('codes', JSON.stringify(updatedCodes));
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
      {codes.length > 0 && (
        <Stack className="units" direction="row" spacing={1}>
          {codes.map((code, index) => (
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
                <EditIcon />
              </Button>
              <Button
                onClick={() => onDeleteCode(index)}
              >
                <DeleteIcon />
              </Button>
            </ButtonGroup>
          ))}
        </Stack>
      )}
    </>
  )
}

export default App
