import styles from "./styles.module.scss";
import { PlayerContext } from '../../contexts/PlayerContext'
import { useContext } from 'react' 

const Player = () => {

  const player = useContext(PlayerContext);

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="" />
        <strong>Tocando Agora {player}</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um Podcast</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider}></div>
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="./shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="./play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="./play.svg" alt="Tocar" />
          </button>
          <button type="button">
            <img src="./play-next.svg" alt="Tocar Próxima" />
          </button>
          <button type="button">
            <img src="./repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Player;
