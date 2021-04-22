// SSR
// SSG



export default function Home(props) {
  

  return (
    <div>
      <h1>Index</h1>
      <div>{JSON.stringify(props.episodes)}</div>
    </div>
  ) 
}

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
