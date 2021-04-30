import React, {useRef, useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { Helper } from "./Helper";
import moment from "moment";
import * as Animatable from 'react-native-animatable';

const NEW_YORK = require('../assets/images/new_york.jpg');

export default function PromotionBanner(props) {
    return(
        <ImageBackground source={NEW_YORK} style={{
            backgroundColor: 'red',
            height: 180,
            borderRadius: 12,
            padding: 20,
            marginBottom: 10,
            marginTop: 10,
            resizeMode: 'cover',
            overflow: 'hidden'
        }}>
            <View style={{marginTop: 15, flexDirection: 'column'}}>
                <Text style={[styles.textWithShadow, {fontFamily: 'Roboto', fontSize: 20, fontWeight: 'bold', color: "#fff"}]}>{props.destination.name}</Text>
                <Text style={[styles.textWithShadow, {fontFamily: 'Roboto', fontSize: 12, fontWeight: '400', color: "#fff"}]}>from {props.departure.name}</Text>

                <View style={{marginTop: 10}}>
                    <Text style={[styles.textWithShadow, {fontFamily: 'Roboto', fontSize: 14, color: "#fff"}]}>Average temperature fro CITY HERE in {moment(props.dateFrom).format("MMMM")}:</Text>
                    <Text style={[styles.textWithShadow, {fontFamily: 'Roboto', fontSize: 16, color: "#fff", fontWeight: 'bold'}]}>26 °C</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Animatable.Text animation="tada" delay={2000} iterationCount='infinite' duration={2200} style={[styles.textWithShadow, {fontFamily: 'Roboto', fontSize: 32, color: "#fff", fontWeight: 'bold'}]}>386.4 €</Animatable.Text>

                    <TouchableOpacity style={{padding: 8, backgroundColor: '#e88c39', width: 145, borderRadius: 12, alignItems: 'center'}} onPress={() => Helper.openLink('web', 'https://www.norwegian.com/')}>
                        <Animatable.Text animation="flash" delay={2000} iterationCount='infinite' duration={1800} style={{color: "#fff", fontSize: 16, fontFamily: 'Roboto'}}>CHECK OUT</Animatable.Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    textWithShadow:{
        textShadowColor: 'rgba(0, 0, 0, 0.65)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});