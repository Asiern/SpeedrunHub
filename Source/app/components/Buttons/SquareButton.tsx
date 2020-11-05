import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ColorValue } from 'react-native';
import { h3 } from "../../themes/Styles"

export interface SquareButtonProps {
    title: String;
    color: ColorValue;
    backgroundColor: ColorValue;
    onPress?:  () => void;
}

class SquareButtonComponent extends React.Component<SquareButtonProps, any> {
  constructor(props: SquareButtonProps) {
    super(props);
  }
  
  public render() {
    return (
      <TouchableOpacity style={[styles.container,{ backgroundColor: this.props.backgroundColor }]} onPress={this.props.onPress}>
         <Text style={[h3,{color: this.props.color}]}>{this.props.title}</Text>
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
      },
})

export default SquareButtonComponent;