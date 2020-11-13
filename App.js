import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native';

const screen = Dimensions.get('window');
const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {mins:formatNumber(mins), secs:formatNumber(secs)};
}
export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [showHide, setShowHide] = useState(true);
  const [timesUp, setTimesUp] = useState(0);
  const [lapList, setLapList] = useState([]);
  const {mins, secs} = getRemaining(timesUp);

  
  measurement = () =>{
    lapList.unshift(
      {key: `${lapList.length +1}`, laptime: `${mins}:${secs}`}, );
    console.log(lapList)
  };
  useEffect(() => {
    if(timesUp === 0){
      setShowHide(true);
    }
    else{
      setShowHide(false);
    };

  });
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

  return (
    <View style={styles.container}>
      <View style={{flex:1,alignItems:'center', justifyContent:'flex-end'}}>
        <View style={{width:screen.width/2, height:screen.width/2, borderWidth:5, borderColor:'#383428', borderRadius:screen.width/2, alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.showTime}>{`${mins}:${secs}`}</Text>
        </View>
      </View>
      <View style={{flex:1,alignItems:'center', marginTop:30,}}>
      <FlatList
          data ={lapList}
          renderItem ={({item}) =>(
          <Text style={styles.item}>{lapList.length == 0 ? '' : `Lap ${item.key}.  ${item.laptime}`}</Text>
          )}
        />
      </View>
      <View style={{flex: 1,justifyContent: 'flex-end',marginBottom: 36}}>
        <View style={{flexDirection:'row',justifyContent:'space-around' }}>
          <TouchableOpacity style={styles.refreshButton}>
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
    backgroundColor:'black'
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


});
