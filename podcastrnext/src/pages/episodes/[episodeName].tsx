import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './episode.module.scss'
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

    const router = useRouter();

    if(router.isFallback){
        <p>carregando...</p>
    }
        
    return(
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar"/>
                    </button>
                </Link>
                
                <Image 
                    width={700} 
                    height={160} 
                    src={episode.thumbnail}  
                    alt={episode.title}
                    objectFit='cover'/>

                <button type="button">
                    <img src="/play.svg" alt="Tocar episódio"/>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div 
                className={styles.description} 
                dangerouslySetInnerHTML={{ __html:episode.description }}>
            </div>

        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => { 
    
    const { data } = await api.get('episodes',{
        params: { 
          _limit: 2,
          _sort: 'publish_at',
          _order: 'desc'
        }
    });

    const paths = data.map(episode => {
        return {
            params:{
                episodeName: episode.id
            }
        }
    })


    return{
        paths,
        fallback: 'blocking', // melhor opção para SEO
    }




    /**
     * metodo obrigatório de ser utilizado em toda rota que tá usando geração estática
     * e que tem parâmetros dinamoicos - tem colchetes no nome do arquivo
     * na hora da build o next não tem noção das páginas devem ser formadas já que 
     * elas são geradas de forma dinâmica
     * 
     * getStaticPaths vai pegar as páginas que que acessamos de forma dinâmica e 
     * transform-la em páginas estáticas 
     * 
     * client (borwser) - nesxtjs (node) - server (bcak-end)
     * 
     * Gerção de página estática ocorre na hora d abuild
     * 
     * Tipos de fallback, true, false, blocking
     */
}


export const getStaticProps: GetStaticProps = async (context) => {

    const { episodeName } = context.params; 
    const { data } = await api.get(`/episodes/${episodeName}`)

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

/**
 * 
 * getStaticPaths
 * é uma função importante pois permite a geração de páginas estáticas
 * que são acessadas de forma dinâmica
 * 
 * A Geração da página estática ocorre em dis momentos principais:
 *  - Buildo do progeto (olhando o argumento params)
 *  - quando algum usuário acessa a página diNãmica (fallback: blocking) 
 *  ----- incrmental static generation - geração de páginas estáticas dinmicas
 * 
 */