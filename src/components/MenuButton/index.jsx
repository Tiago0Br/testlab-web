import { useState } from 'react'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import ButtonNew from '../ButtonNew'
import P from 'prop-types'

export default function MenuButton({ id, options }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const isOpen = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleOptionClick = fn => {
        setAnchorEl(null)
        fn()
    }

    return (
        <>
            <ButtonNew id={id} onClickFn={handleClick} />
            <Menu
                id={`${id}-menu`}
                MenuListProps={{
                    'aria-labelledby': id,
                }}
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
            >
                {options.map(({ name, Icon, onClick }) => (
                    <MenuItem
                        key={name}
                        onClick={() => handleOptionClick(onClick)}
                        disableRipple
                    >
                        <ListItemIcon>
                            <Icon fontSize='small' />
                        </ListItemIcon>
                        {name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

MenuButton.propTypes = {
    id: P.string.isRequired,
    options: P.arrayOf(
        P.shape({
            name: P.string.isRequired,
            Icon: P.element.isRequired,
            onClick: P.func.isRequired
        })
    ).isRequired
}