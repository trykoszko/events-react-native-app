import { StyleSheet } from "react-native";

export const EventBoxSliderStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    mainView: {
        flex: 1,
        height: 400
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 350
    },
    card: {
        width: '100%'
    },
    card1: {
        transform: [{ rotate: '-1deg' }]
    },
    card2: {
        transform: [{ rotate: '1deg' }]
    },
    catDropdown: {
        marginBottom: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxHeight: '5%',
    },
    catDropdownTitle: {
        marginRight: 10
    },
    catDropdownSelect: {
        fontSize: 24
    }
})
