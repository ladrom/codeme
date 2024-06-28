import IconButton from '@mui/material/IconButton';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types'
import {useState} from "react";


function Clipboard({ code }) {
  const [open, setOpen] = useState(false);

  function onCopyToClipboard() {
    navigator.clipboard.writeText(code).then(() => {
      setOpen(true);
    }).catch((err) => {
      console.error('Erreur lors de la copie dans le presse-papier:', err);
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="clipboard__button">
      <IconButton onClick={onCopyToClipboard}>
        <ContentPasteIcon color="primary" />
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Contenu copié dans le presse-papiers"
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      />
    </div>
  )
}

Clipboard.propTypes = {
  code: PropTypes.string,
}

export default Clipboard;