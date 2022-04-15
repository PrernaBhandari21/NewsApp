import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  
  static defaultProps = {
    country:"in",
    pageSize: 8,
    category : "general",
  }

  static propTypes = {
    country :PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
    }


  constructor(props){
    super(props);
    console.log("Hello I am a constructor from News Component")
    this.state = {
      articles:[],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
  }
  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({
      loading:true
    })
    let data = await fetch(url); //fetch returns promises
    //async waits body me hee promises k resolve hoone ka 
    this.props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(50);

    this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);

  }
  async componentDidMount(){
    console.log("Cdm")
           
            this.updateNews();

  }

   fetchMoreData = async () => {
    
    this.setState({page : this.state.page + 1})

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2331814d79cb4d11a185c7a8c350b81d&page=${this.state.page}&pageSize=${this.props.pageSize}`
    
    let data = await fetch(url); //fetch returns promises
    //async waits body me hee promises k resolve hoone ka 
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
    })
  };




  render() {
      console.log("render")
    return (
      <>
          <h1 className='text-center' style={{margin:'35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

      {this.state.loading && <Spinner/>}

     <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className='row'>

                                       
                 {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url} >
                <Newsitem title={element.title} description={element.description?element.description.slice(0,88):""} imageurl ={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source = {element.source.name}/>
                </div>        })} 

          </div>

          </div>
          </InfiniteScroll>
                                 
      </>

    )
  }
}

export default News