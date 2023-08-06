import plusIcon from '../../assets/plusIcon.svg'
import { Button, Img } from './styles'

// eslint-disable-next-line react/prop-types
export default function ButtonNew({ onClickFn }) {
    return (
        <Button onClick={onClickFn}>
            <Img src={plusIcon} alt='Novo cadastro' />
        </Button>
    )
}