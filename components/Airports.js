import React, {useState, useEffect} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";

const airports = require('../contexts/airports.json');

export default function Airports(props) {
    const [airportsList, setAirportsList] = useState([]);

    useEffect(() => {
        if(props.airport?.length === 0) {
            setAirportsList([]);
        }

        if (props.airport?.length > 2) {
            const results = airports.filter(x => x.name.toLowerCase().includes(props.airport) || x.code.toLowerCase().includes(props.airport));

            //Update the airports list
            setAirportsList(results.slice(0, 5));
        }
    }, [props.airport]);

    //Render Flatlist item
    const renderItem = (({item}) => (
        <TouchableOpacity style={{padding: 10, flexDirection: 'row', flexShrink: 1, justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => props.updateSelection(item, props.type)}>
            <Text style={{fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold'}}>{item.code}</Text>
            <Text style={{fontSize: 14, fontFamily: 'Roboto', marginLeft: 15}}>{item.name}</Text>
        </TouchableOpacity>
    ));

    if(airportsList.length > 0) {
        return(
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                style={{
                    position: 'absolute',
                    width: '100%',
                    maxHeight: 200,
                    zIndex: 1040,
                    top: 50,
                    backgroundColor: '#fefefe',
                    borderRadius: 12,
                    elevation: 5
                }}
                data={airportsList}
                extraData={airportsList}
                renderItem={renderItem}
                keyExtractor={item => item.code}
                ItemSeparatorComponent={() => (
                    <View style={{height: .5, backgroundColor: 'rgba(204, 204, 204, .6)', width: '92%', alignSelf: 'center'}}/>
                )}
            />
        )
    }
    else {
        return false;
    }
}