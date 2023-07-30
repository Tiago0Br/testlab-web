import Dropdown from '../../components/Dropdown'
import Navbar from '../../components/Navbar'

const options = [
    {
        id: 1,
        name: 'Saúde',
        selected: true
    },
    {
        id: 2,
        name: 'Cidadão',
        selected: true
    },
    {
        id: 3,
        name: 'Educação',
        selected: true
    }
]

export default function Home() {
    return (
        <div>
            <Navbar />
            <Dropdown options={options} />
        </div>
    )
}