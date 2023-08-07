import plusIcon from '../../assets/plusIcon.svg'
import { Button, Img } from './styles'
import P from 'prop-types'

export default function ButtonNew({ onClickFn }) {
    return (
        <Button onClick={onClickFn}>
            <Img src={plusIcon} alt='Novo cadastro' />
        </Button>
    )
}

ButtonNew.propTypes = {
    onClickFn: P.func.isRequired
}