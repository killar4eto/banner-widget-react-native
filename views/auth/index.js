import React, {useRef, useState, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Keyboard
} from "react-native";
import  { Video } from "expo-av";
import CalendarPicker from 'react-native-calendar-picker';
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import Airports from "../../components/Airports";
import {Helper} from "../../components/Helper";

const INTRO = require('../../assets/videos/intro.mp4');

export default function Login(props) {
    StatusBar.setBarStyle("light-content", true);
    const [searchedAirport, setSearchedAirport] = useState('');
    const [pickingFromAirport, setPickingFromAirport] = useState(true);
    const [selectedFrom, setSelectedFrom] = useState({});
    const [selectedTo, setSelectedTo] = useState({});
    const [selectedDateFrom, setSelectedDateFrom] = useState(moment());
    const [selectedDateTo, setSelectedDateTo] = useState(moment().add(1, 'day'));
    const [showCalendar, setShowCalendar] = useState(false);
    const [pickingDateFrom, setPickingDateFrom] = useState(true);
    const video = useRef();
    const airportFromRef = useRef();
    const airportToRef = useRef();
    const minDate = new Date();
    const maxDate = new Date(new Date(minDate.getFullYear(), minDate.getMonth()+2, 0));

    //Update From
    const updateUserSelections = (item, type) => {
        switch(type) {
            //Airport From
            case "airportFrom":
                setSelectedFrom(item);
                setSearchedAirport('');
                break;

            //Airport To
            case "airportTo":
                setSelectedTo(item);
                setSearchedAirport('');
                break;

            default:
                setSelectedFrom({});
                setSelectedTo({});
                setSelectedDateFrom('');
                setSelectedDateTo('');
                setSearchedAirport('');
                break;
        }
    }

    const changeDate = (date) => {
        if(pickingDateFrom) {
            setSelectedDateFrom(date);
        }
        else {
            setSelectedDateTo(date);
        }

        setShowCalendar(false);
    }

    return (
        <View style={[props.extraProps.theme.container]}>
            <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 1, position: 'absolute', top: 0}}>
                <Video
                    ref={video}
                    style={[props.extraProps.theme.intro_video]}
                    resizeMode="cover"
                    source={INTRO}
                    isMuted={true}
                    volume={0.2}
                    isLooping={true}
                    shouldPlay={true}
                />
            </View>

            <KeyboardAvoidingView enabled behavior={'padding'} style={props.extraProps.theme.authCentralContainer}>
                <View style={{justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20}}>
                    <TextInput
                        autoCapitalize='none'
                        clearButtonMode='while-editing'
                        ref={airportFromRef}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                            airportToRef.current.focus();
                        }}
                        returnKeyType="next"
                        style={{
                            marginTop: 5,
                            width: '100%',
                            height: 35,
                            borderBottomWidth: 1,
                            borderColor: '#e88c39',
                            fontSize: 14,
                            fontFamily: 'Roboto',
                            paddingLeft: 8
                        }}
                        onFocus={() => {
                            setPickingFromAirport(true);
                            setSearchedAirport('');
                        }}
                        keyboardType="default"
                        onChangeText={(value) => setSearchedAirport(value)}
                        defaultValue={selectedFrom.name}
                        placeholderTextColor='grey'
                        placeholder="From where?"
                    />
                    {pickingFromAirport ?
                        <Airports airport={searchedAirport} type='airportFrom' updateSelection={(data) => updateUserSelections(data, 'airportFrom')}/>
                        :
                        null
                    }
                </View>

                <View style={{justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20}}>
                    <TextInput
                        autoCapitalize='none'
                        clearButtonMode='while-editing'
                        ref={airportToRef}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                            setShowCalendar(true);
                        }}
                        returnKeyType="next"
                        onFocus={() => {
                            setPickingFromAirport(false);
                            setSearchedAirport('');
                        }}
                        style={{
                            marginTop: 5,
                            width: '100%',
                            height: 35,
                            borderBottomWidth: 1,
                            borderColor: '#e88c39',
                            fontSize: 14,
                            fontFamily: 'Roboto',
                            paddingLeft: 8
                        }}
                        keyboardType="default"
                        onChangeText={(value) => setSearchedAirport(value)}
                        defaultValue={selectedTo.name}
                        placeholderTextColor='grey'
                        placeholder="To where?"
                    />
                    {!pickingFromAirport ?
                        <Airports airport={searchedAirport} type='airportTo' updateSelection={(data) => updateUserSelections(data, 'airportTo')}/>
                        :
                        null
                    }
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                    <TouchableOpacity onPress={() => {
                        setPickingDateFrom(true);
                        setShowCalendar(true);
                    }} style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons name='calendar-today' size={22} color={"#e88c39"}/>
                        <Text style={{fontSize: 16, fontFamily: 'Roboto', color: selectedDateFrom ? '#000' : 'grey', marginLeft: 10}}>{selectedDateFrom ? moment(selectedDateFrom).format("DD.MM.YYYY") : moment().format("DD.MM.YYYY")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setPickingDateFrom(false);
                        setShowCalendar(true);
                    }} style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons name='calendar-today' size={22} color={"#e88c39"}/>
                        <Text style={{fontSize: 16, fontFamily: 'Roboto', color: selectedDateTo ? '#000' : 'grey', marginLeft: 10}}>{selectedDateTo ? moment(selectedDateTo).format("DD.MM.YYYY") : moment().add(1, 'day').format("DD.MM.YYYY")}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity disabled={Helper.isEmptyObject(selectedFrom) || Helper.isEmptyObject(selectedTo)} style={[props.extraProps.theme.generalBtn, {backgroundColor: !Helper.isEmptyObject(selectedFrom) && !Helper.isEmptyObject(selectedTo) ? '#e88c39' : 'grey'}]} onPress={() => props.navigation.navigate('List', {userSelected: {selectedFrom, selectedTo, selectedDateFrom: selectedDateFrom, selectedDateTo: selectedDateTo}})}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Roboto', fontWeight: '600'}}>Continue</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            {showCalendar ?
                <TouchableOpacity onPress={() => setShowCalendar(false)} activeOpacity={1} style={props.extraProps.theme.calendar}>
                    <View style={{backgroundColor: '#fff', width: '95%', alignSelf: 'center', borderRadius: 8}}>
                        <CalendarPicker
                            width={220}
                            height={180}
                            scaleFactor={200}
                            startFromMonday={true}
                            allowRangeSelection={false}
                            minDate={minDate}
                            maxDate={maxDate}
                            todayBackgroundColor="#e57a18"
                            selectedDayColor="#e88c39"
                            selectedDayTextColor="#fff"
                            textStyle={{
                                fontFamily: 'Roboto',
                                color: '#000',
                            }}
                            onDateChange={changeDate}
                        />
                    </View>
                </TouchableOpacity>
                :
                null
            }
        </View>
    )
}