import React, { Component, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";
export default class TransactionScreen extends Component {


  constructor(props){
    this.state ={
      domState: "normal",
      hasCameraPermissions: null, 
      scanned : false,
      scannedData: ""

    }
  }
  getCameraPermission = async domState=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status == "granted",
      domState: damState,
      scanned: false
    });
  };
  handleBarScanned = async({type, data}) =>{
    this.setState({
      scannedData:data, 
      domState:"normal",
      scanned : true
    });
  }
  render() {
    const {domState, hasCameraPermissions, scannedData,scanned } = this.state; 
    if(domState== "scanned"){
           return(
             <BarCodeScanner
             onBarCodeScanned={scanned ? undefined : this.handleBarScanned}
             tyle ={StyleSheet.absoluteFillObject}></BarCodeScanner>
           )
    }
    return (
      <View style={styles.container}>
        <Text style ={styles.text}>
          {hasCameraPermissions ? scannedData:"Request for permission"}
        </Text>
        <TouchableOpacity style ={[styles.button,{marginTop:25}]}
        onPress={()=>this.getCameraPermission("scanner")}>
          <Text style ={tyles.buttonText}> Scan or Code</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Transaction Screen</Text>
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
  text: {
    color: "#ffff",
    fontSize: 30
  }, 
  button:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    width : "43%",
    height : 55,
  },
  buttonText:{
    fontSize:24,
    color :"#FFFFFF"

  }
});
