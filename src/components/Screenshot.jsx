import IconButton from "@mui/material/IconButton";
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import html2canvas from "html2canvas";
import PropTypes from "prop-types";


function Screenshot({ ToCaptureRef }) {
  function captureScreenshot() {
    const canvasPromise = html2canvas(ToCaptureRef.current, {
      useCORS: true
    });
    canvasPromise.then((canvas)=> {
      const dataURL = canvas.toDataURL("image/png");
      // Create an image element from the data URL
      const img = new Image();
      img.src = dataURL;
      img.download = dataURL;
      // Create a link element
      const a = document.createElement("a");
      a.innerHTML = "DOWNLOAD";
      a.target = "_blank";
      // Set the href of the link to the data URL of the image
      a.href = img.src;
      // Set the download attribute of the link
      a.download = img.download;
      // Click the link to trigger the download
      a.click();
    });

  }
  return (
    <div className="screnshot__button">
      <IconButton onClick={captureScreenshot}>
        <ScreenshotMonitorIcon color="secondary"/>
      </IconButton>
    </div>
  )
}

Screenshot.propTypes = {
  ToCaptureRef: PropTypes.object.isRequired,
};

export default Screenshot;