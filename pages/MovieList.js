import React, {useState,useEffect} from 'react';
import { View, Text,StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
    Input,
    Icon,
    useColorModeValue,
    Box,
    Center,
    NativeBaseProvider,
    SearchIcon,
    ChevronDownIcon,
  } from "native-base";
  import Axios from 'axios';




function MovieList(props,{ navigation}) {

    const [masterMovie, setMasterMovie]= useState([]);
    const [movie, setMovie]= useState([]);
    const [genre, setGenre]= useState([]);
    const [selectedValue, setSelectedValue] = useState("All");
    const [search,setSearch] = useState("");
    const [data,setData] = useState([]);


    async function getData(){
      
      let list_movie = await Axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=cb5cbc8359d4bece5273536fb0a8b800');
      let list_genre = await Axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=cb5cbc8359d4bece5273536fb0a8b800&language=en-US');
      
      let data_movie =list_movie.data.results
      let genre = list_genre.data.genres

      let arr_list = []
      let compactArr = []

      for(let i in data_movie){
        let obj = {
          adult: data_movie[i].adult,
          backdrop_path: data_movie[i].backdrop_path,
          genre_ids: data_movie[i].genre_ids,
          id: data_movie[i].id,
          original_language: data_movie[i].original_language,
          original_title: data_movie[i].original_title,
          overview: data_movie[i].overview,
          popularity: data_movie[i].popularity,
          poster_path: data_movie[i].poster_path,
          release_date: data_movie[i].release_date,
          title: data_movie[i].title,
          video: data_movie[i].video,
          vote_average: data_movie[i].vote_average,
          vote_count: data_movie[i].vote_count,
        }
        
        for(let m in genre){
          let obj2 = {
            id: genre[m].id,
            name: genre[m].name
          }

          function startFromZero(arr) {
            let newArr = [];
            let count = 0;
        
            for (let i in arr) {
                newArr[count++] = arr[i];
            }
        
            return newArr;
        }
        
          for(let k in obj.genre_ids){
            if(obj.genre_ids[k] === obj2.id){
              delete obj.genre_ids[k];
              // obj.genre_ids.shift()
              obj.genre_ids.push(obj2.name);
            }
          }
          obj.genre_ids.filter(function (item) {
            return item !== undefined;
          });

          obj.genre_ids = startFromZero(obj.genre_ids)
        }

        arr_list.push(obj)
        
        
      }



      setMasterMovie(arr_list);
      setMovie(arr_list);
      setGenre(list_genre.data.genres);

    }

    useEffect(()=>{
      getData()
    },[])

    const searchFilter = (text) => {
      if(text) {
          let txt = text.toLowerCase()
          const newData = movie.filter((item) => {
              return item.title.toLowerCase().match(txt)
          });
          
          setMovie(newData);
          setSearch(text);
      }
      else{
          setMovie(masterMovie);
          setSearch(text);
      }
  }

  const filterGenre = (genreFiltered) => {
    setSelectedValue(genreFiltered)
    if(genreFiltered != 'All'){
      let txt = genreFiltered.toLowerCase()
      const newData = masterMovie.filter((element) => {
        if(element.genre_ids.includes(genreFiltered)){
          return element.title
        }
      })

      
      setMovie(newData);
    }else{
      setMovie(masterMovie);
    }
  }

        return (

          <NativeBaseProvider>
            <Box w="100%"  style={styles.searchBar}> 
            <Input
              InputLeftElement={
                <SearchIcon />
                
              }
              
              placeholder="Search..." // mx={4}
              placeholderTextColor={useColorModeValue("blueGray.400", "blueGray.50")}
              value={search}
              onChangeText={(text) => searchFilter(text)}
              
              InputRightElement={
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 140 }}
                  onValueChange={(itemValue, itemIndex) => filterGenre(itemValue)}
                >
                  <Picker.Item label="All Genres" value="All" />
                  {
                    genre.map((item,key)=>
                      <Picker.Item label={item.name} value={item.name} key={key}  />
                    )
                  }
                </Picker>
              }
              />
            </Box>
            
          <Text style={styles.Text}>All Movies</Text>
          
          <FlatList 
            showsHorizontalScrollIndicator={false}
            data={movie}
            horizontal
            contentContainerStyle={{
              alignItems:'center'
            }}

            renderItem={({item})=>{
              return(
                <View >
                  <TouchableOpacity onPress={()=>{
                      props.navigation.navigate('MovieDetail',{
                        original_title: item.original_title,
                        genre: item.genre_ids,
                        poster_path: item.poster_path,
                        release_date: item.release_date,
                        overview: item.overview,
                        vote_average: item.vote_average,
                        adult: item.adult,

                      })
                  }}>
                    <View style={styles.containerPoster}>
                      <Image source={{uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+item.backdrop_path}} style={styles.poster}/>
                      <Text style={styles.textTitle}>{item.original_title}</Text>
                      <Text style={styles.textTitle}>({new Date(item.release_date).getFullYear()})</Text>
                      
                    </View>
                  </TouchableOpacity>
                  
                </View>
              )
            }}
          />
          
        </NativeBaseProvider>
        
      );
  }
    

  const styles = StyleSheet.create({
    searchBar :{
        // marginLeft:15,
        marginRight:15,
        marginTop:10,
        backgroundColor:'white',
        borderRadius:12,
        borderColor:'gray'
    },
    Text:{
      color:'white',
      marginTop:50,
      fontSize:24,
      padding:10,
      marginBottom:-80
    },
    textTitle:{
      color:'white',
      fontSize:16,
      marginTop:5
    },
    poster:{
      width:200,
      height:300,
      borderRadius:10,
      borderColor:'white',
      borderWidth:2
    },
    containerPoster:{
      alignItems:'center',
      padding:8
    }
    
  });

export default MovieList;