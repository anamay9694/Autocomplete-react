import React,{useEffect,useState,useRef} from 'react';
import classes from './autocomplete.module.css';
import closeIcon from '../../images/closeicon.svg'
const AutoComplete=(props)=>{
    const [recommendations,setRecommendations]=useState([]);
    const [selectedMovies,setSelectedMovies]=useState([]);
    const [inputText,setInputText]=useState("")
    const [showRecommendations,setShowRecommendations]=useState(false)
    const recommendationBox = useRef(null);
    const errorBox=useRef(null);
    const [errorMessage,setErrorMessage]=useState("")
    useEffect(()=>{
        function handleClickOutside(event) {
            if (recommendationBox.current && !recommendationBox.current.contains(event.target)) {
              setShowRecommendations(false)
            }
            if (errorBox.current && !errorBox.current.contains(event.target)) {
                setShowRecommendations(false)
              }
          }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    },[]);
    const onClickRemove = (movieImdbID) => {
        setSelectedMovies(selectedMovies.filter(item=>item.imdbID!==movieImdbID));
    }
    const getOptions=(input)=>{
        (async () => {
            try{
            const url="http://www.omdbapi.com/?apikey=46a0f81b&s="+input+"&type=movie";  
            const response = await fetch(url,{
              method:'GET'
            });
            var resData = await response.json();
            if(resData.Response==="True"){
                const retrievedRecommendations=resData.Search;
                 setRecommendations(retrievedRecommendations.filter(item=>{
                     for(let i=0;i<selectedMovies.length;i++){
                         if(selectedMovies[i].imdbID===item.imdbID){
                             return false;
                         }
                     }
                     return true;
                 }));
                 setErrorMessage("");
                 setShowRecommendations(true);
            }else{
                setRecommendations([])
                if(resData.Error==="Too many results."){
                    setErrorMessage("Too many movies match. Enter more characters.")
                }else if(resData.Error==="Movie not found!"){
                    setErrorMessage(resData.Error);
                }
                setShowRecommendations(true);
            }
            }catch(error){
                setRecommendations([])
                setShowRecommendations(false);
            }
          })();
  
    }
    const inputTextChange=(event)=>{
        setInputText(event.target.value)
        getOptions(event.target.value);
    }
    const addSelectedRecommendation=(recommendation)=>{
        setShowRecommendations(false)
        const newSelectedMovies=[...selectedMovies];
        newSelectedMovies.push(recommendation);
        setSelectedMovies(newSelectedMovies);
        setInputText("");
    }
    return (
     <div className={classes.searchboxarea}>
        <div className={classes.searchbox}>
            { selectedMovies.length !== 0 ?
              selectedMovies.map( ( item ) => {
                return <span className={classes.selecteditems} key={item.imdbID }>
                                    <span>{ item.Title }</span>
            <span className={classes.closeicon}><img src={ closeIcon }  alt="Cross" onClick={ ()=>onClickRemove(item.imdbID) } className={classes.imgIcon}/> </span>
                        </span>
                            } )
                :null
            }
            { selectedMovies.length !== 5 ?
                        <span>
						<input type="text" className={classes.inputField} onChange={ inputTextChange } value={ inputText }/>	
					    </span>
					: null
				}
        </div>
        {
            showRecommendations===true && inputText && inputText.trim()!=="" ?
            <ul className={classes.recommendations} ref={recommendationBox}>
            { recommendations.map( ( recommendation ) => {
                return (
                    <li className={classes.recommendation} key={ recommendation.imdbID} onClick={()=>addSelectedRecommendation(recommendation)} >
                        <div className={classes.recommendationTitle}>
                        { recommendation.Title }
                        </div>
                        <div className={classes.recommendationYear}>
                            {recommendation.Year}
                        </div>
                    </li>
                );
            } ) }
           </ul>
            :null
        }
        {
          showRecommendations===true && errorMessage.trim()!=="" && inputText && inputText.trim()!=="" ?
          <ul className={classes.recommendations} ref={errorBox}>
                  <li className={classes.recommendation}  >
                      <div className={classes.recommendationTitle}>
                     {errorMessage}
                      </div>
                      <div className={classes.recommendationYear}>
                      </div>
                  </li>
         </ul>
         : null
        }
        {selectedMovies.length===5? <div className={classes.warning}>You can select at max 5 movies.</div>: null}
     </div>
    )
}

export default AutoComplete;