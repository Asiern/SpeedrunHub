import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ColorValue } from 'react-native';
import { h3 } from "../../themes/Styles"
import Feather from "@expo/vector-icons/Feather";

export interface SquareButtonProps {
    title: String;
    color: ColorValue;
    backgroundColor: ColorValue;
    onPress?:  () => void;
    icon?:string;
}

class SquareButtonComponent extends React.Component<SquareButtonProps, any> {
  constructor(props: SquareButtonProps) {
    super(props);
  }
  
  public render() {
    return (
      <TouchableOpacity style={[styles.container,{ backgroundColor: this.props.backgroundColor }]} onPress={this.props.onPress}>
        {this.props.icon?<Feather name={this.props.icon} style={{marginHorizontal:10}} size={20} color={this.props.color}/>:null}
        <Text style={[h3,{color: this.props.color, alignSelf:"center"}]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 200,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        shadowColor: "gold",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.9,
        elevation: 5,
        alignSelf:"center",
        flexDirection:"row",
        alignContent:"center"
      },
})

export default SquareButtonComponent;