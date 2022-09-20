import './HomePage.scss'
import Nav from '../../components/Nav/Nav'
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import FileUpload from '../../components/FileUpload/FileUpload'


function HomePage() {
    return (
        <div className='home'>
            <Nav active="dashboard" />

            <div className='home__wrapper'>
                <div className='home__body'>
                    <h1>Logo</h1>


                    <ImageUpload />
                    <FileUpload />
                    <input type="file" accept="image/*" capture="environment"></input>
                </div>
            </div>

        </div>
    )
}

export default HomePage