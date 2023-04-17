import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },

    detailsContainer: {
        width: '100%',
    },
    detailsSurface: {
        backgroundColor: Colors.primary1,
        elevation: 5,
    },
    detailsView: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 5,
        paddingTop: 5,
    },
    userCardWrapper: {
        flexDirection: 'column',
        //alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: '5%',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
    },
    userName: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 30,
        fontWeight: '500',
    },
    userResidence: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 30,
    },
    userPhone: {
        fontSize: 24,
        fontWeight: '300',
        marginTop: 10,
        marginLeft: 10,
    },
    userEmail: {
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 30,
        marginLeft: 10,
    },
    manageWrapper: {
        flexDirection: 'column',
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: '5%',
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
    },
    manageContainer: {
        marginTop: 20,
        marginHorizontal: 50,
    },

    dropdown1BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
    },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

    //      STANDARD STYLES
    standardRow: { flexDirection: 'row', alignItems: 'center' },
    standardTitleWrapper: {
        alignItems: 'center',
    },
    standardSurfaceContainer: {
        padding: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    standardTitle: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    customButton: {
        // width: '100%',
    },
    customButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    //      MODAL STYLES
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 0,
        elevation: 5,
    },
    modalTitleWrapper: {
        alignItems: 'center',
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalProfileDetailsWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    modalSectionHeader: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalTeamRow: { flexDirection: 'row', alignItems: 'center' },
    modalDataContainer: { marginLeft: 10 },
    modalDataText: {
        fontSize: 18,
        fontWeight: '400',
        letterSpacing: 0.7,
    },
    modalUserName: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 0.7,
    },
    modalDataTextSmall: {
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 0.7,
    },
    modalDataTextLargeBold: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.7,
    },
    modalProfileDetailsTopicTextWrapper: { padding: 5 },

    modalButtonWrapper: {
        marginHorizontal: 10,
        marginVertical: 25,
        alignItems: 'center',
    },
});
