import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swalAlert = withReactContent(Swal)

export const testCaseModal = () => {
    swalAlert.fire({
        title: 'Novo caso de teste',
        html:
            '<input id="title" name="title" class="swal2-input" placeholder="Título">' +
            '<input id="description" name="description" class="swal2-input" placeholder="Descrição">' +
            '<input id="preconditions" name="preconditions" class="swal2-input" placeholder="Pré-condições">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('title').value,
                document.getElementById('description').value,
                document.getElementById('preconditions').value
            ]
        }
    })
}

export const testSuiteModal = () => {
    swalAlert.fire({
        title: 'Nova suíte de testes',
        html:
            '<input id="title" name="title" class="swal2-input" placeholder="Título">',
        focusConfirm: false,
        preConfirm: () => {
            return document.getElementById('title').value
        }
    })
}

export const folderModal = () => {
    swalAlert.fire({
        title: 'Nova pasta',
        html:
            '<input id="folderName" class="swal2-input" placeholder="Nome">',
        focusConfirm: false,
        preConfirm: () => {
            return document.getElementById('folderName').value
        }
    })
}