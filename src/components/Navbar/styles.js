import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Img = styled.img`
    width: 50px;
    height: 50px;
`

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1b2430;
    padding: 20px 80px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
`

export const NavbarList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Item = styled.li`
    list-style: none;
    padding: 0 20px;
    position: relative;
`

export const ItemText = styled(Link)`
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover, &.active {
        color: #17cf97;
    }

    &:hover::after, &.active::after {
        content: "";
        width: 30%;
        height: 2px;
        background-color: #17cf97;
        position: absolute;
        bottom: -4px;
        left: 20px;
    }
`