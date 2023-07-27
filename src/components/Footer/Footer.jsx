import './Footer.css';

function Footer() {
    return (
        <section className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__content">
                <p className="footer__year">&copy; 2023</p>
                <div className="footer__info">
                    <p className="footer__description">Яндекс.Практикум</p>
                    <a className="footer__link" href='https://github.com/Anna-Nekrasova' target="_blank" rel="noopener noreferrer">Github</a>
                </div>
            </div>
        </section>
    );
}

export default Footer;