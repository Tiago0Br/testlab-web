import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swalAlert = withReactContent(Swal)

export const formModal = (title, fields) => {
    let html = ''

    fields.forEach(({ id, description }) => {
        html += `<input id="${id}" name="${id}" class="swal2-input" placeholder="${description}">`
    })

    swalAlert.fire({
        title,
        html,
        focusConfirm: false,
        confirmButtonText: 'Salvar',
        confirmButtonColor: '#2e7d32',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d32f2f',
        preConfirm: () => {
            const returnedValues = []
            fields.forEach(({ id }) => {
                let fieldValue = document.getElementById(id).value
                if (!fieldValue) {
                    Swal.showValidationMessage('Preencha todos os campos!')
                }

                returnedValues.push(fieldValue)
            })

            return returnedValues
        }
    })
}

export const testCaseModal = () => {
    const fields = [
        { id: 'testTitle', description: 'Título' },
        { id: 'testDescription', description: 'Descrição' },
        { id: 'testPreconditions', description: 'Pré-condições' },
    ]

    formModal('Novo caso de teste', fields)
}

export const testSuiteModal = () => {
    const fields = [
        { id: 'testSuiteTitle', description: 'Título' }
    ]

    formModal('Nova suíte de testes', fields)
}

export const folderModal = () => {
    formModal('Nova pasta', [{ id: 'folderName', description: 'Nome' }])
}