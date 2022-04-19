import React from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect , useState} from 'react';

const News = (props)=>{  

  const [articles,setarticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
    }


  const updateNews=async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url); //fetch returns promises
    //async waits body me hee promises k resolve hoone ka 
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(50);


    setarticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

   
    props.setProgress(100);

  }

  useEffect(() => {
      document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`

   updateNews();
  // eslint-disable-next-line
  },[])
  
  // const handlePrevClick = async ()=>{
  //   setPage(page-1)
  //   updateNews();
  // }
  
  // const handleNextClick = async ()=>{
  //   setPage(page+1)
  //   updateNews();
  // }

   const fetchMoreData = async () => {
    

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2331814d79cb4d11a185c7a8c350b81d&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page + 1)

    let data = await fetch(url); //fetch returns promises
    //async waits body me hee promises k resolve hoone ka 
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)

    
  };




      console.log("render")
    return (
      <>
          <h1 className='text-center' style={{margin:'35px 0px', marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

      {loading && <Spinner/>}

     <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className='row'>

                                       
                 {articles.map((element)=>{
                return <div className="col-md-4" key={element.url} >
                <Newsitem title={element.title} description={element.description?element.description.slice(0,88):""} imageurl ={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source = {element.source.name}/>
                </div>        })} 

          </div>

          </div>
          </InfiniteScroll>
                                 
      </>

    )
  
}

News.defaultProps = {
  country:"in",
  pageSize: 8,
  category : "general",
}

News.propTypes = {
  country :PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News