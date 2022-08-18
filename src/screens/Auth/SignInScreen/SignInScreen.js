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
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
// import { ALL_EVENTS } from '../../../../data/getRegionalEvents';
import { updateCurrentUser } from '../../../features/users/usersSlice';
import { getProfile } from '../../../providers/users';
import { getRegionByAffiliateStateProv } from '../../../providers/system';
import { loadRallies } from '../../../features/rallies/ralliesSlice';
import { loadRegistrations } from '../../../features/users/usersSlice';
import {
    setRegion,
    setEventRegion,
} from '../../../features/system/systemSlice';
import { getToday, printObject } from '../../../utils/helpers';
import { REGION } from '../../../constants/regions';
import { getPateDate } from '../../../utils/date';
import { PricingButton } from 'react-native-elements/dist/pricing/PricingCard';
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
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    Auth.completeNewPassword(
                        username, // the Cognito User Object
                        password,
                        []
                    )
                        .then((user) => {
                            // at this time the user is logged in if no MFA required
                            console.log(user);
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
        await Auth.currentUserInfo().then((u) => {
            currentUserInfo = u;
        });
        await Auth.currentSession().then((data) => {
            currentSession = data;
        });

        //   WAIT
        let i = currentSession?.idToken?.payload?.sub;
        let u = currentSession?.idToken?.payload['cognito:username'];
        let e = currentSession?.idToken?.payload?.email;
        let j = currentSession?.idToken?.jwtToken;
        let g = currentSession?.idToken?.payload['cognito:groups'];
        let theUser = {};

        theUser.uid = i;
        theUser.username = u;
        theUser.email = e;
        theUser.jwtToken = j;
        theUser.groups = g;

        //   ########################
        //   get user profile
        //   ########################
        let fullUserInfo = {};
        let region = 'us#east#south#ga';
        let eventRegion = 'east';
        await getProfile(theUser.uid).then((profileResponse) => {
            // console.log('profileResponse', profileResponse);
            switch (profileResponse.statusCode) {
                case 200:
                    // profile found
                    let profileInfo = profileResponse.userProfile;
                    // printObject('SIS:154-->theUser:', theUser);
                    // printObject('SIS:155-->profileInfo', profileInfo);
                    fullUserInfo = { ...profileInfo, ...theUser };
                    fullUserInfo.profile = true;
                    // printObject('FIS:158-->fullUserInfo[1]:', fullUserInfo);
                    break;
                case 404:
                    // no profile for uid
                    fullUserInfo = theUser;
                    fullUserInfo.profile = false;
                default:
                    // we should get the error code, message and error
                    console.log('StatusCode: ', profileResponse.statusCode);
                    console.log('Message: ', profileResponse.message);
                    console.log('Error:', profileResponse.error);
                    // Alert.alert('Error getting the profile information');
                    fullUserInfo = theUser;
                    break;
            }
            if (!fullUserInfo?.affiliations?.active?.length) {
                console.log('SETTING DEFAULT');
                let defaultAffiliations = {
                    options: ['FEO'],
                    active: 'FEO',
                };
                fullUserInfo = {
                    ...fullUserInfo,
                    affiliations: defaultAffiliations,
                };
            } else {
                console.log('NOT SETTING DEFAUL');
                // fullUserInfo = {
                //     ...fullUserInfo,
                //     affiliate: fullUserInfo?.affiliations?.active,
                // };
                // console.log(
                //     'affilate set to ',
                //     fullUserInfo?.affiliations?.active
                // );
            }
            // printObject('SIS:186-->fullUserInfo:', fullUserInfo);
            dispatch(updateCurrentUser(fullUserInfo));
            //   get system.region and system.eventRegion
            // default to GEORGIA

            // printObject('SS:167-->fullUserInfo:', fullUserInfo);
            if (fullUserInfo?.residence?.stateProv) {
                // get the region information based on te users stateProv.
                getRegionByAffiliateStateProv(
                    fullUserInfo?.affiliations?.active,
                    fullUserInfo?.residence?.stateProv
                ).then((response) => {
                    if (response.statusCode === 200) {
                        region = response?.body?.region;
                        //todo -- if system region != user.region, should we update provide with system value??
                    } else {
                        // default to the profile value
                        region =
                            REGION[
                                fullUserInfo?.residence?.stateProv.toUpperCase()
                            ];
                    }
                    if (region) {
                        const regionParts = region.split('#');
                        eventRegion = regionParts[1];
                    } else {
                        eventRegion = 'test';
                    }
                });
                // lookup region from value
            }
            dispatch(setRegion(region));
            dispatch(setEventRegion(eventRegion));
        });
        // let's load redux with rallies.
        //   ====================================
        //   START RALLY LOADING
        //   ====================================

        if (process.env.ENV === 'DEV') {
            console.log('DEV NOT SUPPORTED IN PROD');
            return;
            // const fileRallies = ALL_EVENTS.body.Items;
            // let response = {
            //     body: fileRallies,
            // };
            // dispatch(loadRallies(fileRallies));

            // const tDay = getToday();
            // const publicRallies = fileRallies.filter(
            //     (r) => r.approved === true && r.eventDate >= tDay
            // );
            // setApprovedRallies(publicRallies);
            // // setIsLoading(false);
        } else {
            const tDay = getPateDate(getToday());
            const config = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            };
            let obj = {
                operation: 'getAllEvents',
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.AWS_API_ENDPOINT + '/events';
            //let dbRallies = await axios.post(api2use, body, config);

            axios
                .post(api2use, body, config)
                .then((response) => {
                    //   SAVE ALL RALLIES TO REDUX
                    let allEvents = response.data.body.Items;
                    // console.log('affiliate_filter:', fullUserInfo?.affiliate);

                    let affiliatedEvents = allEvents.filter(
                        (e) => e.affiliate === fullUserInfo?.affiliate
                    );

                    dispatch(loadRallies(affiliatedEvents));

                    //saveAllRallies(response.data.body.Items);
                    // console.log('MS:81-->events', response.data.body.Items);

                    // let dbRallies = response.data.body.Items;
                    // const publicRallies = dbRallies.filter((r) => {
                    //     return (
                    //         r.approved === true &&
                    //         r.eventDate >= tDay &&
                    //         r.eventRegion === eventRegion
                    //     );
                    // console.log('==============================');
                    // console.log('r.name:', r.name);
                    // console.log('r.approved:', r.approved);
                    // console.log('r.eventDate', r.eventDate);
                    // console.log('tDay:', tDay);
                    // console.log('r.eventRegion:', r.eventRegion);
                    // console.log('EVENT_REGION:', eventRegion);
                    // });
                    // printObject('MS:112->publicRallies', publicRallies);
                    // setApprovedRallies(publicRallies);
                })
                .catch((err) => {
                    console.log('MS-60: error:', err);
                    navigation.navigate('ErrorMsg', {
                        id: 'MS-60',
                        message:
                            'Cannot connect to server. Please check internet connection and try again.',
                    });
                });
            //   ================================================
            //    now get all the registrations for the user
            //   ================================================
            // printObject('MS:128--> entireRallyList', entireRallyList);
            obj = {
                operation: 'getAllUserRegistrations',
                payload: {
                    rid: theUser.uid,
                },
            };
            body = JSON.stringify(obj);

            api2use = process.env.AWS_API_ENDPOINT + '/registrations';
            //let dbRallies = await axios.post(api2use, body, config);
            try {
                axios
                    .post(api2use, body, config)
                    .then((response) => {
                        let respData = response.data.body;
                        if (respData) {
                            function asc_sort(a, b) {
                                return b.eventDate - a.eventDate;
                            }
                            let newRegList = respData.sort(asc_sort);
                            // printObject('SIS:256-->regList', newRegList);

                            dispatch(loadRegistrations(newRegList));
                        }
                    })
                    .catch((err) => {
                        console.log('SIS:255: error:', err);
                        navigation.navigate('ErrorMsg', {
                            id: 'SIS-257',
                            message:
                                'Cannot connect to server. Please check internet connection and try again.',
                        });
                    });
            } catch (error) {
                console.log('SIS:265-->Axios errror.');
            }
        }

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
