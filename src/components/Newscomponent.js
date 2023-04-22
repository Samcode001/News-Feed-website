import React, { Component } from 'react'
import Newsitem from './Newsitem';
import PropTypes from 'prop-types'// for defining proptypes
import InfiniteScroll from 'react-infinite-scroll-component'; // npm i react-infinite-scroll-component
import Spinner from './Spinner';


export class Newscomponent extends Component {

    static defaultProps = {
        category: 'general'
    }
    static propTypes = {
        category: PropTypes.string
    }
    constructor() {   // Constructor to set default data
        super();
        this.state = {
            article: [],
            page:1,
            totalResults:0,
            loading:true
        }
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=d9af89b891fa493488911f16642a9ba7&pageSize=6&page=1`;
        this.props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(60);
        this.setState({
            article: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100);
    }

    componentDidMount() {  // Lifecycle for api
        this.updateNews();
    }

     fetchMoreData=()=>{
      this.setState({page:this.state.page+1},async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=d9af89b891fa493488911f16642a9ba7&pageSize=6&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            article: this.state.article.concat(parsedData.articles),
            totalResults:parsedData.totalResults
        })
      })
    }

    render() {
        return (
            <>
                <h1 className={`text-center my-3 text-${this.props.mode==='light'?'dark':'light'}`}>Top Headlines!</h1>
                { this.state.loading && <Spinner/>}  {/* works as 'and'  if data is not loaded loading id true hence the spinner will show but if data is loaded the loading is false hence the spinner will not show*/} 
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className='container'>
                        <div className="row my-4" >
                            {this.state.article.map((element) => {  // map function to read all data 
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} detailUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} mode={this.props.mode}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default Newscomponent