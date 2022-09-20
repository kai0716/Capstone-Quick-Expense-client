import './Avatar.scss'

export default function Avatar(props) {
    const { className, image, alt } = props
    return (
        <img className={className} src={image} alt={alt} />
    );
}