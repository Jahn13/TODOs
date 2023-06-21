import { CalendarCheck, Trash} from 'react-bootstrap-icons';
import './style.css';

function TodoItems(props) {
    return (
      <li className='d-flex justify-content-between lihover'>
        <button className={`bg-transparent border-0 btn btn-outline-success 
        ${props.completed}`}
          onClick={props.onComplete}
        ><CalendarCheck size={25} /></button>

        <p className={`pt-2 m-0 ${props.completed && "Icon--active"}`}>{props.text}</p>

        <button className='bg-transparent border-0 btn btn-outline-danger' 
          onClick={props.onDelete}
        ><Trash size={25} /></button>
      </li>
    );
  }
  
  export { TodoItems };
  