import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { List } from '../interfaces/List'
import { Previsualizacion } from "./prev";
import s from '../style/inicio.module.css'

type PropsPrev = {
    lista: List[]
}

export const PrevModal = ({lista}:PropsPrev) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <div className={s.btn_prev}>
            <Button onClick={handleOpen} sx={text}>
              <p className={s.previsualizar}>Previsualizar</p>
              </Button>
        </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Previsualizacion lista={lista} handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
    position: "absolute" as "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "ghostwhite",
    border: "none",
    boxShadow: 12,
    p: 4,
    borderRadius: 1.25,
    padding: 4
  };

  const text = {
    textTransform: "none"
  }
