import React from 'react';
import {Link} from 'react-router-dom';
import {Constants} from "../constants/Constants";
import './character.css';



class Character extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      chars: [],
      charLength: '',
      variantName: 'portrait_small',
      id: '',
    };
    this.handle = this.handleScroll.bind(this);
  };

  componentDidMount() {
    this.getCharacters();
    window.addEventListener('scroll', this.handle, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handle, false)
  }

  handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // do something at end of scroll
        console.log('end of scroll');
        this.getMoreCharacters();
    }

  };
  getCharacters = () => {

    //`https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&limit=${limit}`
    fetch(Constants.getCharacters())
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
          chars: json.data.results,
          charLength: json.data.results.length,
        });
        console.log(json);
      })

  };

  getMoreCharacters = () => {
    let offset = this.state.charLength;

    //`https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&limit=${limit}&offset=${offset}`
    fetch(Constants.getMoreCharacters(offset))
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
          chars: this.state.chars.concat(Array.from(json.data.results)),
          charLength: this.state.chars.length
        });
        //console.log('getMORE');
        //console.log(json);
      })


  };


  //{{pathname: '/detail', state:{characterId:char.id}}}

  char = (char, index) => {
    return (
      <div className="Char-Card" key={`char-item-${index}`}>
        <Link to={`/detail/${char.id}`}>
          <div className="Image">
            <img src={char.thumbnail.path+'/'+this.state.variantName+'.'+char.thumbnail.extension}
               alt="OF"/>
          </div>

          <li>
            {char.name}
          </li>

          <div className="Description">
            Available comics: {char.comics.available}
          </div>

        </Link>


      </div>
    )
  };



  render() {
    const {chars} = this.state;
    return (
      <div>
        <ul className="List" onScroll={this.handleScroll}>
          {
            chars.map((char, index) => {
              //const {name} = char;
              return this.char(char, index)
            })
          }
        </ul>
      </div>
    )
  }




  }


export default Character;

