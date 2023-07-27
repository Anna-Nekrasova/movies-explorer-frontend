import './AboutMe.css';

function AboutMe() {
    return (
        <section className="about" id="about">
            <h2 className="about__title">Студент</h2>
            <div className="about__content">
                <div className="about__info">
                    <h3 className="about__name">Анна</h3>
                    <p className="about__description">Фронтенд-разработчик, 24 года</p>
                    <p className="about__text">Я родилась и живу в Санкт-Петербурге, закончила СПбГУАП по технической
                        специальности "Управление качеством". Недавно изучила курс по веб-разработке от Яндекс Практикума.
                        Больше всего мне нравится верстка, могу верстать часами, не замечая времени. После сдачи диплома
                        планирую устроиться на постоянную работу фронтенд-разработчиком.</p>
                    <a className="about__link" href='https://github.com/Anna-Nekrasova' target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <div className="about__photo"></div>
            </div>
        </section>
    );
}

export default AboutMe;