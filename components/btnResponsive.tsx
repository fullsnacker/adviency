import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditModal from './editModal';
import { CopyModal } from './copyModal';
import { List } from "../interfaces/List"
import Tooltip from '@mui/material/Tooltip';
import s from "../style/inicio.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


type Props = { //mediante la palabra clave type permite crear nuevos tipos y luego reutilizarlos
    setLista: ([]) => void;
    lista: List[]; //Y DE ESTA MANERA SE TYPEA UN ARRAY DE OBJETOS;
    edit: List;
    copy: List;
}

const ITEM_HEIGHT = 48;

export default function BtnResponsive({setLista, lista, edit, copy}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = (c: number) :void => {
    setLista(lista.filter(g => g.id !== c)) //y le digo que filtre por aquellos regalos que no se llamen igual que mi regalo a eliminar
        localStorage.setItem('lista', JSON.stringify(lista.filter(g => g.id !== c)))
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            //width: '20ch',
          },
        }}
      >
          <MenuItem>
            <CopyModal setLista={setLista} lista={lista} copy={copy} handleCloseMenu={handleCloseMenu}/>
            <EditModal setLista={setLista} lista={lista} edit={edit} handleCloseMenu={handleCloseMenu}/>
            <Tooltip title="Eliminar">
                <button //al boton de eliminar le tengo que decir QUE ELEMENTO de mi array de regalos tienen que eliminar
                onClick={()=> handleDelete(copy.id)} //asi que por parametro le paso a la funcion el elemento (r)
                className={s.trash}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </Tooltip>
          </MenuItem>
      </Menu>
    </div>
  );
}