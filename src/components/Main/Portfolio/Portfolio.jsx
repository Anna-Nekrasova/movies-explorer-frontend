import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <nav className="portfolio__content">
                <ul className="portfolio__list">
                    <li className="portfolio__element">
                        <h3 className="portfolio__name">Статичный сайт</h3>
                        <a className="portfolio__link" href='https://github.com/Anna-Nekrasova/how-to-learn' target="_blank" rel="noopener noreferrer">&#8599;</a>
                    </li>
                    <li className="portfolio__element">
                        <h3 className="portfolio__name">Адаптивный сайт</h3>
                        <a className="portfolio__link" href='https://github.com/Anna-Nekrasova/russian-travel' target="_blank" rel="noopener noreferrer">&#8599;</a>
                    </li>
                    <li className="portfolio__element">
                        <h3 className="portfolio__name">Одностраничное приложение</h3>
                        <a className="portfolio__link" href='https://github.com/Anna-Nekrasova/react-mesto-api-full-gha' target="_blank" rel="noopener noreferrer">&#8599;</a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default Portfolio;