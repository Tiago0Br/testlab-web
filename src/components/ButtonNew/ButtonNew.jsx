import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import P from 'prop-types'

export const ButtonNew = ({ id, onClickFn, color }) => {
    return (
        <Fab 
            id={id}
            color={color || 'success'} 
            aria-label='Adicionar' 
            onClick={onClickFn}
        >
            <AddIcon />
        </Fab>
    )
}

ButtonNew.propTypes = {
    id: P.string.isRequired,
    onClickFn: P.func.isRequired,
    color: P.string
}