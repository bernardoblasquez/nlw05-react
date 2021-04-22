import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import { api } from '../components/services/api';


type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  publishedAt: string,
  duration: number,
  durationAsString: string,
  description: string,
  url: string,
}

type HomeProps = {
  episodes: Episode[]
}

export default function Home(props: HomeProps) {
  
  return (
    <div>
      <h1>Index</h1>
      <div>{JSON.stringify(props.episodes)}</div>
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
          publishedAt: format(parseISO(episode.published_at), 'd MM yy', {locale: ptBR} ),
          duration: Number(episode.file.duration),
          durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
          description: episode.description,
          url: episode.file.url
        }
      })
    
      return {
        props: {
          episodes: episodes 
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
