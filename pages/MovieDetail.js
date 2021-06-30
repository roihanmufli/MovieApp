import React, {useState,useEffect} from 'react';
import { View, Text,StyleSheet, Image} from 'react-native';



function MovieDetail({ route, navigation }) {

    const [Adult,setAdult] = useState("");
    const [OriginalTitle,setOriginalTitle] = useState("");
    const [Genre,setGenre] = useState([]);
    const [PosterPath,setPosterPath] = useState("");
    const [ReleaseDate,setReleaseDate] = useState("");
    const [Overview,setOverview] = useState("");
    const [VoteAverage,setVoteAverage] = useState("");

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

    const { original_title,
        genre,
        poster_path,
        release_date,
        overview,
        vote_average,
        adult} = route.params;

    useEffect(()=>{
        if(JSON.parse(JSON.stringify(adult)) === false){
            setAdult("No")
        } else {
            setAdult("Yes")
        }

        let genre_list = JSON.parse(JSON.stringify(genre))
        setOriginalTitle(JSON.parse(JSON.stringify(original_title)));
        setGenre(genre_list);
        setPosterPath(JSON.parse(JSON.stringify(poster_path)));
        setReleaseDate(JSON.parse(JSON.stringify(release_date)));
        setOverview(JSON.parse(JSON.stringify(overview)));
        setVoteAverage(JSON.parse(JSON.stringify(vote_average)));

    },[])

    return (
        
        <View>
            <Text style={styles.textTitle}>{OriginalTitle}</Text>
            <View style={{flexDirection:'row'}}>
                <Image source={{uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+PosterPath}} style={styles.poster} />
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.plainText}>Adult</Text>
                        <Text style={{fontSize:12,color:'gray',marginLeft:42,marginTop:10}}>{Adult}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.plainText}>Genre</Text>
                        <Text style={{fontSize:12,color:'gray',marginLeft:37,marginTop:10}}>{Genre.map((item,key)=>{return item + "\n"})}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.plainText}>Release {"\n"} Date</Text>
                        <Text style={{fontSize:12,color:'gray',marginLeft:20,marginTop:10}}>{monthNames[new Date(ReleaseDate).getMonth()] + ' ' + new Date(ReleaseDate).getDay() + ', '  +new Date(ReleaseDate).getFullYear()}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.plainText}>Rating</Text>
                        <Text style={{fontSize:12,color:'gray',marginLeft:37,marginTop:10}}>{VoteAverage}</Text>
                    </View>
                </View>
            </View>
            <Text style={{color:'white',fontSize:30,marginTop:10}}>Overview</Text>
            <View style={{paddingLeft:10,paddingRight:10}}>

            <Text style={{color:'white',fontSize:16,marginTop:10,textAlign:'justify'}}>{Overview}</Text>
            </View>
            
        </View>
        
       
        
      
      
    );
  }

  const styles = StyleSheet.create({
    container:{
        flex: 1, 
        flexDirection:'row'
    },
    searchBar :{
        marginLeft:15,
        marginTop:10
    },
    poster:{
        width:200,
        height:300,
        borderRadius:10,
        borderColor:'white',
        borderWidth:2
      },
    textTitle:{
        fontSize:18,
        color:'white',
        marginLeft:8,
        fontWeight:'bold',
        justifyContent:'center',
        marginBottom:5,
        textAlign:'center'
    },
    fillplainText:{
        fontSize:12,
        color:'white',
        marginLeft:30,
    },
    plainText:{
        fontSize:12,
        color:'white',
        marginLeft:8,
        marginTop:10
    },
    boxSimple: {
        flex:1,
        
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'white',
        padding: 10,
        margin: 20,
        
    },
  });

export default MovieDetail;