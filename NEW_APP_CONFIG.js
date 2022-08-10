export default ({ config }) => {
    console.log(config.android);
    //set key here
    const myValue = 'My App';
    // expo.ios.config.googleMapsApiKey = AIzaSyAFWegK19_bMbbYuTeKatromwzuiC4lADo
    let configSetting;
    configSetting.expo = '';
    return {
        ...config,
    };
};
