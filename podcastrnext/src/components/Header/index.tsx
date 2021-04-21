import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss'

const Header = () => {

    const currentDate = format(new Date, 'EEEEEE, dd, MMMM', {locale: ptBR});

    return(
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcaster"/>
            <p>O melhor para vc ouvir, sempre</p>
            <span>{currentDate}</span>
        </header>        
    );
}

export default Header;