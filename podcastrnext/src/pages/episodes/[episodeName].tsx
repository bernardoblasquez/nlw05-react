import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { api } from '../../components/services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    duration: number;
    durationAsString: string;
    publishedAt: string;
    description: string;
  }
  
type EpisodeProps = {
    episode: Episode
}

export default function Episodes ({ episode }: EpisodeProps) {
        
    return(
        <h1>{episode.title}</h1>
    )
}

export const getStaticPaths: GetStaticPaths = async () => { 
    
    return{
        paths:[],
        fallback: 'blocking',
    }
}


export const getStaticProps: GetStaticProps = async (context) => {

    const { episodeName } = context.params; 
    const { data } = await api.get(`/episodes/${episodeName}`)

   // console.log(episodeName)

    const episode =  {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail, 
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MM yy', {locale: ptBR} ),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
    }

    return{
        props:{
            episode,
        },
        revalidate: 60*60*24, //24 hours
    }



} 


// episodeName - está entre [] no nome do arquivo