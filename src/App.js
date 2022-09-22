import "./styles.css";
import React, {useState} from "react"
import axios from "axios"


let pokemon_list = []
const options = {
  method: 'GET',
  url: 'https://pokemon-go1.p.rapidapi.com/pokemon_names.json',
  headers: {
    'X-RapidAPI-Key': '6df8fdd096mshcc2f91ae80b3344p174683jsn5429e9bbc09e',
    'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com'
  }
};
async function getData(){
  return new Promise(function (resolve, reject) {
    axios.request(options).then(function (response) {
      let dict = response.data
      for(let k in dict){
            pokemon_list.push(dict[k]['name'])
        }
        resolve(pokemon_list)
    }).catch(function (error) {
      console.error(error);
      reject(error)
    });
  })
}
let data = getData()
export default function App() {
  const [value, setValue] = useState('')
  const onChange = (event) =>{
    setValue(event.target.value);
  }
  const onSearch = (searchTerm) => {
    setValue(searchTerm)
      console.log('search', searchTerm)
  }

  return (
    <div className="App">
          <h1>Search for Pokemon</h1>
          <div className="search-container">
            <div className="search-inner">
              <input id="poke_name" type="text" value={value} onChange={onChange}/>
              <button onClick={()=> onSearch(value)}>Search</button>
            </div>
            <div className="dropdown" style={{width: "205px"}}>
                {pokemon_list.filter(item => {
                  const searchTerm = value.toLowerCase();
                  const item1 = item.toLowerCase()
                  return searchTerm && item1.startsWith(searchTerm) && item1 !== searchTerm 
                })
                .slice(0, 10)
                .map((item) => (
                <div onClick={() => onSearch(item)} className="dropdown-row" key={item}>
                  {item}
                  </div>
                ))}
            </div>
              
            </div>    
    </div>
  );
}


