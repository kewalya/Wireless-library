import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'
export default class TransactionScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      hasCameraPermissions : null,
      scanned : false,
      scannedData : 'pratham',
      domState : 'normal'
    };
  }
  getCameraPermissions=async domState =>{
  const {status} = await Permissions.askAsync(Permissions.CAMERA)
  this.setState({
  hasCameraPermissions : status === "granted",
  domState : domState,
  scanned : false
  })
  }

handleBarCodeScanned = async ({type,data})=>{
this.setState({
 scanned : true,
 scannedData : data,
 domState : "normal"
})
  }
  render() {
    const {
  domState,scanned,scannedData,hasCameraPermissions}=this.state
  if(domState==="scanner"){
    return(
    <BarCodeScanner onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}/>  
    )
  }
    return (
      <View style={styles.container}>
      <Text>{hasCameraPermissions ? scannedData:"request for cammera permission"}</Text>
        <Text style={styles.displayText}>Transaction Screen</Text>
        <TouchableOpacity onPress = {()=>this.getCameraPermissions("scanner")} style={styles.scanButton}>
        <Text>SCAN QR CODE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
displayText : {
  fontSize : 15,
  textDecorationLine : 'underline',
 color : "white"
},
scanButton : {
  backgroundColor:"red",
  padding : 10,
  margin : 10
}

});
