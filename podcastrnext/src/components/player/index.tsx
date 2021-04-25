import styles from "./styles.module.scss";
import Image from 'next/image';
import { usePlayer } from '../../contexts/PlayerContext'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

import { useState, useRef, useEffect } from 'react' 
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

const Player = () => {

  const audioRefs  = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0)

  const {  
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState, 
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState,
  } = usePlayer()

  useEffect(()=>{
    if (!audioRefs.current){
      return;
    }

    if (isPlaying){
      audioRefs.current.play();
    }else{
      audioRefs.current.pause();
    }

  }, [isPlaying])

  function setupProgressListener(){
    audioRefs.current.currentTime = 0 
    audioRefs.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRefs.current.currentTime))
    })
  }

  function handleSeek(amount: number){
    audioRefs.current.currentTime = amount;
    setProgress(amount)
  }

  function handleEpisodeEnded(){
    if (hasNext){
      playNext()
    }
    else{
      clearPlayerState()
    }
  }

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
          <span>
          {convertDurationToTimeString(progress)}
          </span>
          <div className={styles.slider}>
            
            {episode ? (
                // Tem episodio
                <Slider 
                  max = {episode.duration}
                  value = {progress}
                  onChange={handleSeek}
                  trackStyle = {{backgroundColor: '#04d361'}}
                  railStyle = {{backgroundColor: '#9f75ff'}}
                  handleStyle = {{borderColor: '#04d361', borderWidth: "3px"}}
                  />
                ):(
                // Empty
                <div className={styles.emptySlider}></div>  
              )}

          </div>
          <span>
              {convertDurationToTimeString(episode?.duration ?? 0)}
          </span>
        </div>
        
        {
          episode && (
            <audio src={episode.url} 
              ref={audioRefs}
              autoPlay 
              loop={isLooping}
              onPlay={() => setPlayingState(true)}
              onPause={() => setPlayingState(false)} 
              onEnded={handleEpisodeEnded}
              onLoadedMetadata={setupProgressListener} 
            />
          )
        }

        <div className={styles.buttons}>
          <button type="button" 
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}>
            <img src="./shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" 
            disabled={!episode || !hasPrevious} 
            onClick={playPrevious}>
            <img src="./play-previous.svg" alt="Tocar anterior" />
          </button>

          <button type="button" 
            disabled={!episode}
            className={styles.playButton}
            onClick={togglePlay}>
            {
              isPlaying
                ? <img src="./pause.svg" alt="Tocar" />
                : <img src="./play.svg" alt="Tocar" />
            }
          </button>

          <button type="button" 
            disabled={!episode || !hasNext}    
            onClick={playNext} >
            <img src="./play-next.svg" alt="Tocar Próxima" />
          </button>
          <button type="button" 
            disabled={!episode} 
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}>
            <img src="./repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Player;
