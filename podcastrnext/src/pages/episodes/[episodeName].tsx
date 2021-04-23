import { useRouter } from 'next/router'


const episodes = () =>{
    
    const router = useRouter();
    
    return(
        <h1>{router.query.episodeName}</h1>
    )
}

export default episodes;


// episodeName - está entre [] no nome do arquivo