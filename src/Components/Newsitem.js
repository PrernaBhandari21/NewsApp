import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, newsUrl, author, date ,source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent :'flex-end',
            position:'absolute',
            right:'0'
          }}>
        <span class="badge rounded-pill bg-danger">
                {source}
              </span>
              </div>
          <img
            src={
              !imageurl
                ? "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/8717c0e5ab8b12977db56ae05eccf6dc.jpg"
                : imageurl
            }
            alt={"Related to news"}
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}...</p>

            <p className="card-text">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </p>

            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Newsitem;
