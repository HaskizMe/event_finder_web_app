/* eslint-disable react/prop-types */
import '../styles/styles.css'

const RedButton = ({width, height, onClick, children, style}) => {
    return(
        <>
            <button 
                className='red-button' 
                style={{width: width, height: height, ...style}} 
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
}
export default RedButton;