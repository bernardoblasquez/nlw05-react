import styles from './styles.module.scss'

const Header = () => {

    

    return(
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcaster"/>
            <p>O melhor para vc ouvir, sempre</p>
            <span>qui, 8 abril</span>
        </header>        
    );
}

export default Header;