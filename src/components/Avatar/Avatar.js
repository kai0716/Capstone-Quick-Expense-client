import './Avatar.scss'
import img from '../../assets/logo/icon.png'

export default function Avatar(props) {
    const { className, image, alt } = props
    return (
        <>

            <img className="avatar" src={image} alt={alt} />
        </>
    );
}