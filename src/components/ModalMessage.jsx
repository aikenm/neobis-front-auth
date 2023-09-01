import '../styles/ModalMessage.css';
import logo from '../images/logo.png';

function ModalMessage({ email, onClose }) {
    return (
      <div className="modal-overlay">
        <div className="modal">
            <img src={logo} alt="" className='logo-image'/>
            <p>На вашу почту «<span className='email'>{email}</span>»<br />было отправлено письмо</p>
            <button onClick={onClose} className='form-button'>Закрыть</button>
        </div>
      </div>
    );
}

export default ModalMessage;
  