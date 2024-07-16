import TextField from "@mui/material/TextField";
import { Alert, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {readCodeData, updateCodeData, writeCodeData} from "../../database.js";

function Form({ codes, setCodes, codeUnit, setCodeUnit, editIndex, setEditIndex }) {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      code: "",
      language: "javascript"
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    reset(codeUnit);
  }, [codeUnit, reset]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onSaveCode = async (data) => {
    const isTitleExist = codes.some(item => item.title.toLowerCase() === data.title.toLowerCase());
    if (!isTitleExist && data.title.trim().length > 0) {
      setCodes([...codes, data]);
      setCodeUnit({ title: "", code: "", language: "javascript" });
      await writeCodeData(data);
      await readCodeData()
        .then(data => {
          setCodes(data);
        })
      reset();
    } else {
      setOpen(true);
    }
  };

  const onEditCode = async (data) => {
    const existingIndex = codes.findIndex(item => item.id === data.id);
    if (existingIndex !== -1) {
      const updatedCodes = [...codes];
      updatedCodes[existingIndex] = data;
      setCodes(updatedCodes);
      await updateCodeData(data.id, data);
      setEditIndex(null);
    }
    setCodeUnit({ title: "", code: "", language: "javascript" });
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(editIndex == null ? onSaveCode : onEditCode)}>
      <Controller
        name="title"
        control={control}
        rules={{ required: "Le titre est obligatoire" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Titre"
            variant="filled"
            placeholder="Saisissez le titre"
            fullWidth
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
          />
        )}
      />
      <Controller
        name="code"
        control={control}
        rules={{ required: "Le code est obligatoire" }}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-multiline-static"
            label="Code"
            multiline
            minRows={4}
            variant="filled"
            placeholder="Saisissez le code"
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const { selectionStart, selectionEnd } = e.target;
                const value = e.target.value;
                setValue("code", `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`);
                setTimeout(() => {
                  e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
                }, 0);
              }
            }}
            error={!!errors.code}
            helperText={errors.code ? errors.code.message : ""}
          />
        )}
      />
      <Controller
        name="language"
        control={control}
        rules={{ required: "Language est obligatoire" }}
        render={({ field }) => (
          <TextField
            {...field}
            id="filled-select-currency"
            select
            label="Langage"
            variant="filled"
            fullWidth
            error={!!errors.language}
            helperText={errors.language ? errors.language.message : ""}
          >
            <MenuItem value="javascript">Javascript</MenuItem>
            <MenuItem value="php">PHP</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="twig">Twig</MenuItem>
          </TextField>
        )}
      />
      <Button variant="contained" type="submit">
        {editIndex == null ? "Ajouter" : "Modifier"}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Des données portant le même nom existent déjà"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Des données portant le même nom existent déjà
        </Alert>
      </Snackbar>
    </form>
  );
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
