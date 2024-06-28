import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import {useState, useEffect} from "react";
import PropTypes from "prop-types";

function Form({ codes, setCodes, codeUnit, setCodeUnit, editIndex, setEditIndex }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    setTitle(codeUnit.title);
    setCode(codeUnit.code);
    setLanguage(codeUnit.language);
  }, [codeUnit]);

  function onSaveCode() {
    setCodes([...codes, codeUnit]);
    setCodeUnit({ title: "", code: "", language: "javascript" });
  }

  function onEditCode() {
    const existingIndex = codes.findIndex(item => item.title === codeUnit.title);
    if (existingIndex !== -1) {
      const updatedCodes = [...codes];
      updatedCodes[existingIndex] = codeUnit;
      setCodes(updatedCodes);
      setEditIndex(null);
    }
    setCodeUnit({ title: "", code: "", language: "javascript" });
  }

  const onChangeTitle = (e) => {
    setCodeUnit({ ...codeUnit, title: e.target.value });
  };

  const onChangeCode = (e) => {
    setCodeUnit({ ...codeUnit, code: e.target.value });
  };

  const onChangeLanguage = (e) => {
    setCodeUnit({ ...codeUnit, language: e.target.value.toLowerCase() });
  };

  return (
    <form action="" className="form">
      <TextField
        label="Titre"
        variant="filled"
        placeholder="Saisissez le titre"
        fullWidth
        onChange={onChangeTitle}
        value={title}
        disabled={editIndex != null}
      />
      <TextField
        id="outlined-multiline-static"
        label="Code"
        multiline
        minRows={4}
        variant="filled"
        placeholder="Saisissez le code"
        fullWidth
        onChange={onChangeCode}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            const value = e.target.value;
            setCodeUnit({
              ...codeUnit,
              code: `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`,
            });
            setTimeout(() => {
              e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
            }, 0);
          }
        }}
        value={code}
      />
      <TextField
        id="filled-select-currency"
        select
        label="Language"
        defaultValue="javascript"
        helperText="Sélectionner un langage de programmation"
        variant="filled"
        fullWidth
        onChange={onChangeLanguage}
        value={language}
      >
        <MenuItem value="javascript">Javascript</MenuItem>
        <MenuItem value="php">PHP</MenuItem>
        <MenuItem value="java">Java</MenuItem>
        <MenuItem value="python">Python</MenuItem>
        <MenuItem value="twig">Twig</MenuItem>
      </TextField>
      {editIndex == null ? (
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            onSaveCode();
          }}
        >
          Ajouter
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            onEditCode();
          }}
        >
          Modifier
        </Button>
      )}

    </form>
  )
}

Form.propTypes = {
  codes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      language: PropTypes.string,
    })
  ).isRequired,
  setCodes: PropTypes.func,
  codeUnit: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
    language: PropTypes.string,
  }).isRequired,
  setCodeUnit: PropTypes.func,
  editIndex: PropTypes.number || null,
  setEditIndex: PropTypes.func,
};

export default Form;