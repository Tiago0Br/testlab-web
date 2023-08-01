import styled from 'styled-components'

export const DropdownContainer = styled.div`
    width: 400px;
    position: relative;
`

export const DropdownIcon = styled.img`
    width: 15px;
    height: 15px;
`

export const DropdownBtn = styled.div`
    padding: 15px 20px;
    background-color: white;
    box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`

export const DropdownContent = styled.div`
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    padding: 10px;
    background-color: white;
    box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
    font-weight: 500;
    color: #333;
`

export const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #f4f4f4;
    }
`