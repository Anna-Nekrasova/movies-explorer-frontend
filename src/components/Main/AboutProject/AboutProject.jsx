import './AboutProject.css';

function AboutProject() {
    return (
        <section className="project" id="project">
            <h2 className="project__title">О проекте</h2>
            <div className="project__info">
                <div className="project__stages">
                    <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="project__text">Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.</p>
                </div>
                <div className="project__timing">
                    <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые
                        нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__visual">
                <div className="project__weeks">
                    <p className="project__week project__week_one">1 неделя</p>
                    <p className="project__week project__week_four">4 недели</p>
                </div>
                <div className="project__parts">
                    <p className="project__part">Back-end</p>
                    <p className="project__part">Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;