import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ModifyGift } from './modify';
import { List } from "../interfaces/List"
import s from "../style/inicio.module.css"

type Props = { //mediante la palabra clave type permite crear nuevos tipos y luego reutilizarlos
    setLista: ([]) => void;
    lista: List[]; //Y DE ESTA MANERA SE TYPEA UN ARRAY DE OBJETOS;
    edit: List;
    handleCloseMenu: () => void;
}

export default function EditModal({setLista, lista, edit, handleCloseMenu}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu()
    }

  return (
    <div className={s.box_edit}>
      <Tooltip title="Editar">
      <Button onClick={handleOpen} className={s.arreglo}>
        <FontAwesomeIcon icon={faPenToSquare} className={s.trash}/>
      </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <ModifyGift setLista={setLista} lista={lista} handleClose={handleClose} edit={edit} handleCloseMenu={handleCloseMenu}/>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '21rem',
    bgcolor: 'ghostwhite',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: 2.5
};