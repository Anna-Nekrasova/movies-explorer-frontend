import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import './Main.css';

function Main({ isLoggedIn, openMenu }) {
    return (
        <>
            <Header loggedIn={isLoggedIn} openMenu={openMenu} />
            <main className="content">
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer></Footer>
        </>
    );
}

export default Main;