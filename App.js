//Adding the necessary modules
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native';
//
const screen = Dimensions.get('window'); //getting device dimensions
// Formatting number to the form 00:00
const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {mins:formatNumber(mins), secs:formatNumber(secs)};
};
//
// Hooks states
export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [showHide, setShowHide] = useState(true);
  const [timesUp, setTimesUp] = useState(0);
  const [lapList, setLapList] = useState([]);
  const {mins, secs} = getRemaining(timesUp);

  // Adding values: id key and lap time, to the list
  measurement = () =>{
    lapList.unshift(
      {
        key: `${lapList.length +1}`, 
        laptime: `${mins}:${secs}`
      },);
  };
  //
  // Setting the value to true, false is used to hide buttons
  useEffect(() => {
    if(timesUp === 0){
      setShowHide(true);
    }
    else{
      setShowHide(false);
    };

  });
  //
  //time measurement when value 'isActive' is true
  useEffect(() => {
    let interval =null;
    if(isActive){
      interval=setInterval(() => {
        setTimesUp(timesUp => timesUp +1);
      },1000);
    }else if(!isActive && timesUp !==0){
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[isActive, timesUp]);
//
  return (
    <View style={styles.container}>
      {/* time display */}
      <View style={{flex:2,alignItems:'center', justifyContent:'flex-end'}}>
        <View style={{width:screen.width/2, height:screen.width/2, borderWidth:5, borderColor:'#383428', borderRadius:screen.width/2, alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.showTime}>{`${mins}:${secs}`}</Text>
        </View>
      </View>
      {/* */}
      {/* list display */}
      <View style={{flex:2,alignItems:'center',}}>
      <FlatList
          data ={lapList}
          renderItem ={({item}) =>(
          <Text style={styles.item}>{lapList.length == 0 ? '' : `Lap ${item.key}.  ${item.laptime}`}</Text>
          )}
        />
      

      </View>
      {/* */}
      {/* three buttons at the end of page  */}
      <View style={{flex: 1,justifyContent: 'flex-end',marginBottom: 36}}>
        <View style={{flexDirection:'row',justifyContent:'space-around' }}>
          <TouchableOpacity style={styles.refreshButton}>
            {/* button is hidden when the value is false or true*/}
            <Text style={styles.refreshText} onPress={()=>{setTimesUp(0); setIsActive(false); lapList.length = 0;}}>{showHide ? '' : 'Reset'}</Text> 
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {setIsActive(!isActive);}} style={styles.startButton}>
            <Text style={styles.startText}>{isActive ? '■' : '	▶'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.refreshButton} onPress={measurement}>
            <Text style={styles.refreshText}>{showHide ? '' : 'Lap'}</Text>
          </TouchableOpacity>

        </View>
      </View>
      {/* */}
      <StatusBar style="auto" />
    </View>
  );
}
// the style of each element
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    backgroundColor:'black',
  },
  showTime:{
    fontSize: 50,
    color:'#383428',
    

  },
  startButton:{
    backgroundColor: '#383428',
    width:100,
    height:100,
    borderRadius: 100,
    justifyContent:'center',
    alignItems:'center',

  },
  startText:{
    color:'black',
    fontSize: 40,
    fontWeight:'bold'
  },
  refreshText:{
    color:'#383428',
    fontSize:20,

  },
  refreshButton:{
    width:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item :{
    padding:10,
    color: '#383428',
    fontSize:25,

  },
// 


});
