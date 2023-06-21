import Form from 'react-bootstrap/Form';

const TodoFiltro = (props) => {
    return (
        <Form.Select aria-label="Default select example" 
        className='bg-transparent'
        onChange={(e) => props.filterTodos(e)}
        >
            <option value='1'>Todos</option>
            <option value='2'>Completados</option>
            <option value='3'>Pendientes</option>
        </Form.Select>
    );
}

export { TodoFiltro };