import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteCodeData} from "../../database.js";
import PropTypes from "prop-types";

function CodeList({ codes, setCodes, filterFlag, setFilterFlag, setEditIndex, setCodeUnit }) {
  async function onDeleteCode(id) {
    await deleteCodeData(id);
    const updatedCodes = [...codes].filter(code => {
      return code.id !== id
    });
    setCodeUnit({
      title: "",
      code: "",
      language: "javascript"
    })
    setCodes(updatedCodes);
    setEditIndex(null);
    setFilterFlag('');
  }

  const onEditCode = (id) => {
    const index = codes.findIndex(item => item.id === id);
    setCodeUnit(codes[index]);
    setEditIndex(index);
  };
  return (
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
              key={code.id}
              color="primary"
              onClick={() => {
                setEditIndex(null);
                setCodeUnit(code);
              }}
            >
              {code.title}
            </Button>
            <Button
              onClick={() => onEditCode(code.id)}
            >
              <EditIcon/>
            </Button>
            <Button
              onClick={() => onDeleteCode(code.id)}
            >
              <DeleteIcon/>
            </Button>
          </ButtonGroup>
        ))}
      </Stack>
    </>
  )
}

CodeList.propTypes = {
  codes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      language: PropTypes.string,
    })
  ).isRequired,
  setCodes: PropTypes.func,
  setCodeUnit: PropTypes.func,
  setEditIndex: PropTypes.func,
  filterFlag: PropTypes.string,
  setFilterFlag: PropTypes.func,
};

export default CodeList;