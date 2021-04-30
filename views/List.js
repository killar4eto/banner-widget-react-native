import React, {useRef, useState, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Keyboard, FlatList
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PromotionBanner from "../components/PromotionBanner";

export default function List(props){
    const [content, setContent] = useState([]);
    const destination = props.route.params?.userSelected ? props.route.params?.userSelected.selectedTo : 'Missing';
    const departure = props.route.params?.userSelected ? props.route.params?.userSelected.selectedFrom : 'Missing';
    const country = props.route.params?.userSelected ? props.route.params?.userSelected.country : 'Missing';
    const dateFrom = props.route.params?.userSelected ? props.route.params?.userSelected.selectedDateFrom : 'Missing';
    const dateTo = props.route.params?.userSelected ? props.route.params?.userSelected.selectedDateTo : 'Missing';

    useEffect(() => {
        let addContent = [];
        for(let i=0;i<10;i++) {
            addContent.push({id: i+1, title: `Some title ${i+1}`, description: `Super quick description to ${i+1} index.`, type: i === 5 ? 'special' : null});
        }

        setContent(addContent);
    }, []);

    const renderItem = (({item}) => (
        item.type === 'special' ?
            <PromotionBanner destination={destination} departure={departure} dateFrom={dateFrom} dateTo={dateTo} country={country}/>
                :
            <View style={{flexDirection: 'row', alignItems: 'center', height: 60}}>
                <Text style={{fontFamily: 'Roboto', fontSize: 16, color: '#000', fontWeight: 'bold'}}>{item.title}</Text>
            </View>
    ));

    return(
        <View style={[props.extraProps.theme.container, {padding: 20}]}>
            <View style={{marginTop: 20, marginBottom: 20}}>
                <Text style={{color: '#000', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 28}}>Some example content</Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                style={{flex: 1}}
                data={content}
                extraData={content}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => (
                    <View style={{height: 1, backgroundColor: 'rgba(204, 204, 204, .6)', width: '100%', alignSelf: 'center'}}/>
                )}
            />
        </View>
    );
}