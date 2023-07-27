import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import './Profile.css';
import HeaderNav from '../Header/HeaderNav/HeaderNav'

function Profile() {
    return (
        <>
            <Header>
                <HeaderNav />
            </Header>
            <main className="profile">
                <h1 className="profile__greeting">Привет, Виталий!</h1>
                <div className="profile__line">
                    <p className="profile__element">Имя</p>
                    <p className="profile__element profile__element_value">Виталий</p>
                </div>
                <div className="profile__line">
                    <p className="profile__element">E-mail</p>
                    <p className="profile__element profile__element_value">pochta@yandex.ru</p>
                </div>
                <button type="button" className="profile__editing">Редактировать</button>
                <button type="button" className="profile__exit">Выйти из аккаунта</button>
            </main>
            <Navigation />
        </>
    );
}

export default Profile;