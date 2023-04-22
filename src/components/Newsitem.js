import React, { Component } from 'react'
import no_image from './no-image.jpg'

export class Newsitem extends Component {
    render() {
        let { title, description, imageUrl, detailUrl, date, author, source } = this.props;
        return (
            <>

                <div className={`card text-bg-${this.props.mode === 'light' ? 'light' : 'dark'}`} >
                    {/*The red badge */}
                    <div style={{ display: 'flex', position: 'absolute', right: '0' }}>
                        <span className={`badge rounded-pill bg-${this.props.mode === 'light' ? 'danger' : 'success'}`}>{source}</span>
                    </div>
                    {/* The news single component */}
                    <img src={imageUrl ? imageUrl : no_image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className={`text-${this.props.mode==='light'?'success':'danger'}`} >By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p> {/*toUTCString() for showing  time for better user experience*/}
                        <a href={detailUrl} target='_blank' className={`btn btn-sm btn-${this.props.mode === 'dark' ? 'light' : 'dark'}`}>Read more...</a> {/* btn-sm for small btn */}
                    </div>
                </div>
            </>
        )
    }
}

export default Newsitem