import {
    View,
    Image,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    Alert,
} from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import Logo from '../../../../assets/images/FEO-words.png';
import CustomInput from '../../../components/ui/CustomInput';
import CustomButton from '../../../components/ui/Auth/CustomButton/CustomButton';
import SocialSignInButtons from '../../../components/ui/Auth/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../pateGraphQL/queries';
import { useDispatch } from 'react-redux';
// import { ALL_EVENTS } from '../../../../data/getRegionalEvents';
import { updateCurrentUser } from '../../../features/users/usersSlice';
import {
    initializeDivision,
    getDivisionInfo,
    loadDivisionInfo,
} from '../../../features/division/divisionSlice';
import { getProfile } from '../../../providers/users';
import { getGQLProfile } from '../../../providers/profile.provider';
import { getAffiliate } from '../../../providers/system';
import { loadRallies } from '../../../features/rallies/ralliesSlice';
import { loadRegistrations } from '../../../features/users/usersSlice';
import {
    updateAppName,
    setRegion,
    setEventRegion,
    updateAffiliate,
    updateAffiliateTitle,
    updateStateProv,
    updateAffiliationString,
    updateUserRole,
} from '../../../features/system/systemSlice';
import { getToday, printObject } from '../../../utils/helpers';
import { REGION } from '../../../constants/regions';
import { getPateDate } from '../../../utils/date';

const SignInScreen = () => {
    const [loading, setLoading] = useState(false);
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    console.log('Errors', errors);
    // need this to pass the username on to forgot password
    const user = watch('username');
    const onSignInPressed = async (data) => {
        const { username, password } = data;
        let alertPayload = {};
        // this loading feature prevents user from sending another request before the first one returns
        if (loading) {
            return;
        }
        setLoading(true);
        // authenticate with AWS cognito
        let setAlert = {};
        await Auth.signIn(username, password)
            .then((user) => {
                // printObject('SIS:66-->Auth.signIn response:\n', user);
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    Auth.completeNewPassword(
                        username, // the Cognito User Object
                        password,
                        []
                    )
                        .then((user) => {
                            // at this time the user is logged in if no MFA required
                            printObject('SIS:75-->user:\n', user);
                        })
                        .catch((e) => {
                            const alertPayload = {
                                msg: 'Authentication failed. Please check your credentials',
                                alertType: 'danger',
                            };
                            setAlert(alertPayload);
                            console.log(' need to return');
                            // return;
                        });
                } else {
                    // console.log('the user is good...');
                }
            })
            .catch((e) => {
                switch (e.code) {
                    case 'UserNotFoundException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'PasswordResetRequiredException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'NotAuthorizedException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    default:
                        alertPayload = {
                            msg: 'Signin error: [' + e.message + ']',
                            alertType: 'danger',
                        };
                        break;
                }
            });
        // if we have error loaded, let's return
        if (alertPayload.msg) {
            Alert.alert(alertPayload.msg);
            alertPayload = {};
            setLoading(false);
            return;
        }
        let currentUserInfo = {};
        let currentSession = {};
        let graphQLProfile = {};
        await Auth.currentUserInfo().then((u) => {
            currentUserInfo = u;
        });
        await Auth.currentSession().then((data) => {
            currentSession = data;
        });
        //save JWT token to currentUser
        dispatch(
            updateCurrentUser({ jwtToken: currentSession?.idToken?.jwtToken })
        );
        graphQLProfile = {
            ...graphQLProfile,
            // authSession: currentSession,
            authUserInfo: currentUserInfo,
            role: 'guest',
            status: 'undefined',
        };
        //   WAIT
        let i = currentSession?.idToken?.payload?.sub;
        let u = currentSession?.idToken?.payload['cognito:username'];
        let e = currentSession?.idToken?.payload?.email;
        let j = currentSession?.idToken?.jwtToken;
        let g = currentSession?.idToken?.payload['cognito:groups']; //todo: necessary?
        let theUser = {};

        theUser.uid = i;
        theUser.username = u;
        theUser.email = e;
        theUser.jwtToken = j;
        theUser.groups = g; //todo: necessary?

        //   ########################
        //   get user profile
        //   ########################
        let fullUserInfo = {};
        // let region = 'us#east#south#ga';
        let region = '';
        //let eventRegion = 'east'; //todo: necessary?
        let eventRegion = ''; //todo: necessary?
        //todo  1. getGQLProfile
        //  ********************************************
        //      get the profile information from graphql
        //  ********************************************
        const getGQLProfileInfo = async () => {
            const variables = {
                id: theUser.uid,
            };
            try {
                await API.graphql(
                    graphqlOperation(queries.getProfileBySub, variables)
                )
                    .then((gqlProfileResponse) => {
                        //  *************************************
                        //      got graphQL profile response
                        //  *************************************
                        if (gqlProfileResponse?.data?.listUsers?.items[0]) {
                            graphQLProfile = {
                                ...graphQLProfile,
                                ...gqlProfileResponse?.data?.listUsers
                                    ?.items[0],
                            };
                            graphQLProfile.affiliations.active = {
                                label: 'TBD',
                                role: 'guest',
                                region: 'TBD',
                                value: 'TBD',
                            };
                            // currentUser.affiliations.active = {
                            //     value: graphQLProfile.defaultDivision
                            //         ?.organization?.code,
                            // };
                            return gqlProfileResponse;
                            // printObject(
                            //     'gqlProfile return:',
                            //     gqlProfile?.data?.listUsers?.items[0]
                            // );
                        } else {
                            printObject(
                                'no data returned:\n',
                                gqlProfileResponse
                            );
                        }
                    })
                    .then((gqlProfileResponse) => {
                        //  ***********************************************
                        //      DEFINE THE ROLE & STATUS
                        //  ***********************************************

                        if (graphQLProfile?.affiliations?.items.length > 0) {
                            // we have affiliations
                            //check if we have defaultDivision defined
                            if (graphQLProfile?.defaultDivision?.id) {
                                // we have defaultDivision and Affiliations, get role
                                graphQLProfile.affiliations.items.forEach(
                                    (aff, index) => {
                                        if (
                                            aff?.division?.id ===
                                                graphQLProfile?.defaultDivision
                                                    ?.id &&
                                            aff?.division?.organization?.id ===
                                                graphQLProfile?.defaultDivision
                                                    ?.organization?.id
                                        ) {
                                            graphQLProfile.role = aff?.role;
                                            graphQLProfile.status = aff?.status;
                                            graphQLProfile.affiliations.active =
                                                {
                                                    affiliationId: aff.id,
                                                    status: aff.status,
                                                    role: aff.role,
                                                    divisionId: aff.division.id,
                                                    divisionCode:
                                                        aff.division.code,
                                                    organizationId:
                                                        aff.division
                                                            .organization.id,
                                                    organizationId:
                                                        aff.division
                                                            .organization.id,
                                                    organizationAppName:
                                                        aff.division
                                                            .organization
                                                            .appName,
                                                    organizationAvailable:
                                                        aff.division
                                                            .organization
                                                            .available,
                                                    organizationCategory:
                                                        aff.division
                                                            .organization
                                                            .category,
                                                    organizationDescription:
                                                        aff.division
                                                            .organization
                                                            .description,
                                                    organizationExposure:
                                                        aff.division
                                                            .organization
                                                            .exposure,
                                                    organizationLabel:
                                                        aff.division
                                                            .organization.label,
                                                    organizationName:
                                                        aff.division
                                                            .organization.name,
                                                    organizationValue:
                                                        aff.division
                                                            .organization.value,
                                                    organizationCode:
                                                        aff.division
                                                            .organization.code,
                                                    organizationTitle:
                                                        aff.division
                                                            .organization.title,

                                                    label: aff.division
                                                        ?.organization?.title,
                                                    region: aff.division?.code,
                                                    role: aff?.role,
                                                    value: aff?.division
                                                        ?.organization?.code,
                                                };
                                        }
                                    }
                                );
                            }
                        }
                        //set defaults
                        console.log('vvvvvvvvv');
                        printObject('graphQLProfile:\n', graphQLProfile);
                        console.log('^^^^^^^^^^^');
                        dispatch(updateCurrentUser(graphQLProfile));
                        //  ******************************************
                        //      get the divisionEvents
                        //  ******************************************
                        const variables = {
                            divId: graphQLProfile?.defaultDivision?.id,
                        };
                        if (variables.divId) {
                            const getDivisionalEvents = async () => {
                                //  ******************************************
                                //      get the divisionEvents
                                //  ******************************************

                                try {
                                    await API.graphql(
                                        graphqlOperation(
                                            queries.getAllDivisionEvents,
                                            variables
                                        )
                                    )
                                        .then((divEventsResponse) => {
                                            //  *************************************
                                            //      got graphQL divEvents response
                                            //  *************************************
                                            printObject(
                                                'SIS:331-->eventCount:\n',
                                                divEventsResponse?.data
                                                    ?.getDivision?.events?.items
                                                    .length
                                            );
                                            if (
                                                divEventsResponse?.data
                                                    ?.getDivision?.id
                                            ) {
                                                dispatch(
                                                    initializeDivision(
                                                        divEventsResponse.data
                                                            .getDivision
                                                    )
                                                );
                                            }
                                        })
                                        .catch((error) => {
                                            printObject(
                                                'SIS:284--> divEventRequest error:\n',
                                                error
                                            );
                                        });
                                } catch (error) {
                                    printObject(
                                        'SIS:287--> divEventRequest try/catch error:\n',
                                        error
                                    );
                                }
                            };
                            getDivisionalEvents();
                        }
                    })
                    .catch((e) => {
                        console.log('ERRROROROROROROR ', e);
                    });
            } catch (error) {
                printObject('SIS:230->>error getting try failure:\n', error);
            }
        };

        getGQLProfileInfo();

        //todo  2.
        // await getProfile(theUser.uid).then((profileResponse) => {
        //     // console.log('profileResponse', profileResponse);
        //     switch (profileResponse.statusCode) {
        //         case 200:
        //             // profile found
        //             let profileInfo = profileResponse.userProfile;
        //             fullUserInfo = { ...theUser, ...profileInfo };
        //             // printObject(
        //             //     'SIS:164-->DDB resulting profile:\n',
        //             //     fullUserInfo
        //             // );

        //             fullUserInfo.profile = true;
        //             break;
        //         case 404:
        //             // no profile for uid
        //             fullUserInfo = theUser;
        //             fullUserInfo.profile = false;
        //             break;
        //         default:
        //             // we should get the error code, message and error
        //             console.log('StatusCode: ', profileResponse.statusCode);
        //             console.log('Message: ', profileResponse.message);
        //             console.log('Error:', profileResponse.error);
        //             // Alert.alert('Error getting the profile information');
        //             fullUserInfo = theUser;
        //             fullUserInfo.profile = false;
        //             break;
        //     }
        //     // printObject('SIS:168:--fullUserInfo:', fullUserInfo);
        //     // if profile does not have affiliations, set default to FEO
        //     if (!fullUserInfo?.affiliations) {
        //         let defaultAff = {
        //             options: [
        //                 {
        //                     value: 'FEO',
        //                     label: 'FEO Testing',
        //                     region: 'us#east#south',
        //                     role: 'guest',
        //                     divisionId: '271a8cbb-15b4-4f90-ba9f-a5d348206493',
        //                 },
        //                 {
        //                     value: 'CRP8',
        //                     label: 'CR P8 Rallies',
        //                     region: 'us#east#south',
        //                     role: 'guest',
        //                     divisionId: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
        //                 },
        //             ],
        //             active: {
        //                 value: 'FEO',
        //                 label: 'FEO Testing',
        //                 region: 'us#east#south',
        //                 role: 'guest',
        //                 divisionId: '271a8cbb-15b4-4f90-ba9f-a5d348206493',
        //             },
        //         };
        //         fullUserInfo = { ...fullUserInfo, affiliations: defaultAff };
        //         //fullUserInfo = { ...fullUserInfo, affiliate: 'FEO' };
        //     }
        // dispatch(updateCurrentUser(fullUserInfo));

        //  *************************************
        //      need to set system variables
        //  *************************************
        dispatch(
            updateAffiliationString(graphQLProfile?.affiliations?.active?.value)
        );

        //----------------------------------------------------------------
        //----------------------------------------------------------------
        //----------------------------------------------------------------
        //     //   get/set system.region and system.eventRegion
        //     getAffiliate(fullUserInfo.affiliations.active.value)
        //         .then((response) => {
        //             if (response.statusCode === 200) {
        //                 dispatch(
        //                     updateAffiliationString(
        //                         fullUserInfo.affiliations.active.value
        //                     )
        //                 );
        //                 dispatch(updateAffiliate(response.body[0]));
        //                 dispatch(updateAppName(response.body[0].appName));
        //                 dispatch(
        //                     updateAffiliateTitle(
        //                         fullUserInfo?.affiliations?.active?.label
        //                     )
        //                 );
        //                 dispatch(
        //                     updateStateProv(fullUserInfo?.residence?.stateProv)
        //                 );
        //                 if (fullUserInfo?.affiliations?.active?.role) {
        //                     dispatch(
        //                         updateUserRole(
        //                             fullUserInfo?.affiliations?.active?.role
        //                         )
        //                     );
        //                 } else {
        //                     dispatch(updateUserRole('guest'));
        //                 }
        //                 dispatch(setRegion(response.body[0].regions[0]));
        //                 dispatch(
        //                     setEventRegion(response.body[0].eventRegions[0])
        //                 );
        //             } else {
        //                 console.log(
        //                     'response.statusCode:',
        //                     response.statusCode
        //                 );
        //             }
        //         })
        //         .catch((err) => {
        //             console.log('OH SNAP\n', err);
        //         });
        // });
        // let's load redux with rallies.

        //   ====================================
        //   START RALLY LOADING
        //   ====================================
        // const tDay = getPateDate(getToday());
        // //* get the graphql divisional events
        // try {
        //     async function getDivEvents() {
        //         //todo HARDCODE-HARDCODE
        //         const variables = {
        //             divId: graphQLProfile?.defaultDivision?.id,
        //             startDate: '2023-03-19',
        //         };
        //         API.graphql(
        //             graphqlOperation(queries.getDivisionEvents, variables)
        //         )
        //             .then((divisionEvents) => {
        //                 if (
        //                     divisionEvents?.data?.getDivision?.events.items
        //                         .length > 0
        //                 ) {
        //                     dispatch(
        //                         loadDivisionInfo(
        //                             divisionEvents?.data?.getDivision?.events
        //                                 .items
        //                         )
        //                     );
        //                 } else {
        //                     console.log('NOPE');
        //                 }
        //             })
        //             .catch((error) => {
        //                 printObject(
        //                     'error getting division events from graphql',
        //                     error
        //                 );
        //             });
        //     }
        //     getDivEvents();
        // } catch (error) {
        //     printObject('ERROR GETTING GRAPHQL DATA---->:\n', error);
        // }
        // const config = {
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     },
        // };
        // let obj = {
        //     operation: 'getAllEvents',
        // };
        // let body = JSON.stringify(obj);

        // let api2use = process.env.AWS_API_ENDPOINT + '/events';
        // //let dbRallies = await axios.post(api2use, body, config);

        // axios
        //     .post(api2use, body, config)
        //     .then((response) => {
        //         //printObject('SIS:298-->response:', response);
        //         //   SAVE ALL RALLIES TO REDUX
        //         dispatch(loadRallies(response.data.body.Items));
        //     })
        //     .catch((err) => {
        //         console.log('MS-60: error:', err);
        //         navigation.navigate('ErrorMsg', {
        //             id: 'MS-60',
        //             message:
        //                 'Cannot connect to server. Please check internet connection and try again.',
        //         });
        //     });
        //   ================================================
        //    now get all the registrations for the user
        //   ================================================
        // printObject('MS:128--> entireRallyList', entireRallyList);
        // obj = {
        //     operation: 'getAllUserRegistrations',
        //     payload: {
        //         rid: theUser.uid,
        //     },
        // };
        // body = JSON.stringify(obj);

        // api2use = process.env.AWS_API_ENDPOINT + '/registrations';
        //let dbRallies = await axios.post(api2use, body, config);
        // try {
        //     axios
        //         .post(api2use, body, config)
        //         .then((regResponse) => {
        //             //printObject('SIS:258-->response', response.data);
        //             let respData = regResponse.data.body;
        //             if (respData) {
        //                 function asc_sort(a, b) {
        //                     return b.eventDate - a.eventDate;
        //                 }
        //                 let newRegList = respData.sort(asc_sort);
        //                 // printObject('SIS:256-->regList', newRegList);
        //                 //todo ------------------------------------
        //                 //todo now get the events
        //                 //todo ------------------------------------
        //                 obj = {
        //                     operation: 'getAllEvents',
        //                 };
        //                 body = JSON.stringify(obj);
        //                 api2use = process.env.AWS_API_ENDPOINT + '/events';
        //                 try {
        //                     axios
        //                         .post(api2use, body, config)
        //                         .then((eResponse) => {
        //                             let eventData = eResponse.data.body.Items;
        //                             //   ------------------------------------------
        //                             //   now match up the event with registrations
        //                             //   ------------------------------------------
        //                             const bigList = newRegList.map((reg) => {
        //                                 const eFound = eventData.filter(
        //                                     (e) => e.uid === reg.eid
        //                                 );
        //                                 const newReg = {
        //                                     ...reg,
        //                                     eventInfo: eFound[0],
        //                                 };
        //                                 return newReg;
        //                             });
        //                             dispatch(loadRegistrations(bigList));
        //                         })
        //                         .catch((err) => {
        //                             console.log('SIS:255: error:', err);
        //                             navigation.navigate('ErrorMsg', {
        //                                 id: 'SIS-376',
        //                                 message: 'Cannot blend events',
        //                             });
        //                         });
        //                 } catch (error) {
        //                     console.log('SIS:381: error:', err);
        //                     navigation.navigate('ErrorMsg', {
        //                         id: 'SIS-383',
        //                         message:
        //                             'Cannot connect to get registrations. Please check internet connection and try again.',
        //                     });
        //                 }
        //                 // dispatch(loadRegistrations(newRegList));
        //             }
        //         })
        //         .catch((err) => {
        //             console.log('SIS:392: error:', err);
        //             navigation.navigate('ErrorMsg', {
        //                 id: 'SIS-394',
        //                 message:
        //                     'Cannot connect to server. Please check internet connection and try again.',
        //             });
        //         });
        // } catch (error) {
        //     console.log('SIS:400-->Axios errror.');
        // }

        setLoading(false);
        return;
    };
    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };
    const forgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword', { user });
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                {/* <Image
                    source={Logo}
                    // styles={[styles.logo, { height: height * 0.1 }]}
                    // resizeMode='stretch'
                /> */}
                <Image style={styles.tinyLogo} source={Logo} />
                <CustomInput
                    name='username'
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 4,
                            message: 'Username minimum length is 4',
                        },
                    }}
                    placeholder='Username'
                    control={control}
                />
                <CustomInput
                    name='password'
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password length too short',
                        },
                    }}
                    placeholder='Password'
                    control={control}
                    secureTextEntry
                />

                <CustomButton
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text='Forgot Password'
                    onPress={forgotPasswordPressed}
                    type='TERTIARY'
                />
                {/* <SocialSignInButtons /> */}
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type='TERTIARY'
                />
            </View>
        </ScrollView>
    );
};

export default SignInScreen;
const styles = StyleSheet.create({
    root: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        // width: '100%',
        marginHorizontal: 20,
    },
    logo: {
        width: '40%',
        maxheight: 150,
        maxWidth: 150,
    },
    tinyLogo: {
        width: 225,
        height: 225,
    },
});
