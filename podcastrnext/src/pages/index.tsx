import { GetStaticProps } from 'next';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import Head from 'next/head'
import Link from 'next/link'
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import { api } from '../components/services/api';
import { usePlayer } from '../contexts/PlayerContext'
import styles from './home.module.scss';


type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  duration: number,
  durationAsString: string,
  url: string,
}

type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[]
}

export default function Home({latestEpisodes, allEpisodes}: HomeProps) {
  
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes]

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Podcaster</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Últimos Lançamentos</h2>
        <ul>

          { 
            latestEpisodes.map( (episode, index) => {
              return (

                <li key={episode.id}>
                  <Image 
                    width={192} 
                    height={192} 
                    src={episode.thumbnail}  
                    alt={episode.title}
                    objectFit='cover'/>
                  
                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>

                    <button type="button" onClick={() => playList(episodeList, index)}>
                      <img src="/play-green.svg" alt="Tocar episodio"/>
                    </button>
                  </div>
                </li>

              )}) 
          }

        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os Episódios</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Podcasts</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            
            {allEpisodes.map((episode, index) => {
              
              return(
                <tr key={episode.id}>
                  <td style={{width: 72}}>
                    <Image 
                      width={120} 
                      height={120} 
                      src={episode.thumbnail}  
                      alt={episode.title}
                      objectFit='cover'/>
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width: 100}}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={() => playList(episodeList, index + latestEpisodes.length)}>
                      <img src="/play-green.svg" alt="Tocar Episódio"/>
                    </button> 
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </section>
    </div>
  ) 
}

export const getStaticProps: GetStaticProps = async () =>{
  
      const { data } = await api.get('episodes',{
        params: { 
          _limit: 12,
          _sort: 'publish_at',
          _order: 'desc'
        }
      });

      const episodes = data.map( episode => {
        return {
          id: episode.id,
          title: episode.title,
          thumbnail: episode.thumbnail, 
          members: episode.members,
          publishedAt: format(parseISO(episode.published_at), 'd MM yy', {locale: ptBR} ),
          duration: Number(episode.file.duration),
          durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
          url: episode.file.url
        }
      })

      const latestEpisodes = episodes.splice(0, 2);
      const allEpisodes = episodes.slice(2, episodes.length)
    
      return {
        props: {
          latestEpisodes,
          allEpisodes,
        }, 
        revalidate: 60*60*8,
      } 
}

/*
  SPA --------------------------
    useEffect("What I wanna execute [function]" , "When i wanna execute")
    useEffect( ()=> {}, var)
    useEffect( ()=> {}, '') execute only once
  
    import {useEffect} from 'react'
    Use inside Home()

    useEffect(() =>{
      fetch('http://localhost:3333/episodes')
        .then(response => response.json())
        .then(data => console.log(data))
    }) // SPA way -> it is not indexable by browsers
  

    SSR --------------------------
    - It is executed every time a user access the page.

    export async function getServerSideProps(){
  
      const response = await fetch('http://localhost:3333/episodes');
      const data = await response.json();
      
      console.log("---------------")
      console.log(data)
      console.log("-------------------")
    
      return {
        props: {
          episodes: data 
        } 
      } 
    }


    SSG --------------------------
    export async function getStaticProps(){
  
      const response = await fetch('http://localhost:3333/episodes');
      const data = await response.json();
    
      return {
        props: {
          episodes: data 
        },
        revalidate: 60*60*8,
      } 
    }

*/
