import React from 'react';
import './detail.css';
import {Constants} from "../constants/Constants";


class Detail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      details: [],
      comics:[],
      thumbnail: '',
    }



  }

  componentDidMount () {

    this.getCharacterDetail();
    this.getCharacterComics();
  }

  getCharacterDetail = () => {
    const {match: {params}} = this.props;
    let characterId = params.id;
    //dateRange=2005-01-01,${endDate}&

    //`https://gateway.marvel.com/v1/public/characters/${params.id}/comics?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&limit=${limit}`

    fetch(Constants.getCharacterDetail(characterId))
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage =
              'an error occured',
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          details: json.data.results[0],
          path: json.data.results[0].thumbnail.path,
          thumbnail: json.data.results[0].thumbnail.path+'/portrait_incredible.'+json.data.results[0].thumbnail.extension,
        });
        console.log(json);
      })



  };

  getCharacterComics = () => {
    const {match: {params}} = this.props;
    let characterId = params.id;

    fetch(Constants.getComics(characterId))
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage =
              'an error occured',
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          comics: json.data.results
        });
        //console.log(json);
      })
  };

  comic = (comic, index) => {
    return (
      <div  key={`${comic.id}`}>

        <div>
          {comic.title}
        </div>
      </div>
    )
  };

  render () {
    const {comics} = this.state;
    return (
      <div>
        <div className="Char">
          <h2>
            {this.state.details.name}
          </h2>

          <div className="Description">
            {this.state.details.description || "no description.."}
          </div>

          <div className="Big-Image">
            <img src={this.state.thumbnail}
                 alt="OF"/>
          </div>
        </div>


        <h4>
          Comics that {this.state.details.name} appeared in 2005 - present ({this.state.comics.length})
        </h4>


        <ul className="List">
          {comics.map((comic,index) => {
            return this.comic(comic,index)
          })}
        </ul>
        <hr/>
        <a href="/" className="button">Go Back</a>
      </div>
    )
  }

}

export default Detail;