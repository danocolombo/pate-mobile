import * as yup from 'yup';

export const rallyLocationSchema = yup.object().shape({
    name: yup.string().required('**required').min(5),
    street: yup.string(),
    city: yup.string().required('**required').min(2),
    stateProv: yup.string().required('**required').min(2).max(2),
    postalCode: yup
        .string()
        .required()
        .test('is-postalCode-numeric', 'required (10000 - 99999)', (val) => {
            return parseInt(val) > 9999 && parseInt(val) < 100000;
        }),
});
