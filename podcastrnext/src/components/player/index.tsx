import styles from "./styles.module.scss";
import Image from 'next/image';
import { PlayerContext } from '../../contexts/PlayerContext'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

import { useContext } from 'react' 

const Player = () => {

  const {  
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay 
  } = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="" />
        <strong>Tocando Agora </strong>
      </header>

      { episode ? (
        // episodio existe
        <div className={styles.currentEpisode}>
          <Image
            src={episode.thumbnail}
            width={592}
            height={592} 
            objectFit='cover'
            />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ): (
        // episodio NÂO existe
        <div className={styles.emptyPlayer}>
          <strong>Selecione um posdcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            
            {episode ? (
                // Tem episodio
                <Slider 
                  trackStyle = {{backgroundColor: '#04d361'}}
                  railStyle = {{backgroundColor: '#9f75ff'}}
                  handleStyle = {{borderColor: '#04d361', borderWidth: "3px"}}
                  />
                ):(
                // Empty
                <div className={styles.emptySlider}></div>  
              )}

          </div>
          <span>00:00</span>
        </div>
        
        {
          episode && (
            <audio src={episode.url} 
            autoPlay />
          )
        }

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="./shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="./play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" 
            disabled={!episode}
            className={styles.playButton}
            onClick={togglePlay}>
            
            {isPlaying
              ? <img src="./pause.svg" alt="Tocar" />
              : <img src="./play.svg" alt="Tocar" />
            }

          </button>
          <button type="button" disabled={!episode}>
            <img src="./play-next.svg" alt="Tocar Próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="./repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Player;
