import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../pateGraphQL/queries';
import * as mutations from '../pateGraphQL/mutations';
import { printObject } from '../utils/helpers';

export const getDivisionProfiles = createAsyncThunk(
    'profiles/getProfiles',
    async (divisiionId, thunkAPI) => {
        try {
            const variables = {
                divId: divisiionId,
            };
            const affResponse = await API.graphql(
                graphqlOperation(queries.getDivisionAffiliations, variables)
            );
            //  *************************************
            //      got graphQL division affiliations response
            //  *************************************
            let profiles = {};
            if (
                affResponse?.data?.getDivision?.affiliations?.items?.length > 0
            ) {
                const divProfiles =
                    affResponse?.data?.getDivision?.affiliations?.items;
                // there are multiple roles that we want to organize
                // allProfiles: all the profiles that have status = active
                const activeProfiles = divProfiles.filter((a) => {
                    return a.status === 'active';
                });
                // team: all the profiles with status = active and role != guest
                const team = activeProfiles.filter((a) => {
                    return a.role !== 'guest';
                });
                // guests: all the profiles with status = active and role = guest
                const guests = activeProfiles.filter((a) => {
                    return a.role === 'guest';
                });
                // nonActives: all the profiles with status != active
                const nonActives = divProfiles.filter((a) => {
                    return a.status !== 'active';
                });
                const payload = {
                    actives: activeProfiles,
                    team: team,
                    guests: guests,
                    nonActives: nonActives,
                };
                return payload;
            }
            return {};
        } catch (error) {
            console.log('ERROR:', error);
            return thunkAPI.rejectWithValue(
                'PS:16-->>> something went wrong in remote createAsyncThunk'
            );
        }
    }
);
export const updateAffiliation = createAsyncThunk(
    'profiles/updateProfiles',
    async (affiliation, thunkAPI) => {
        try {
            const variables = {
                affiliation,
            };
            const affResponse = await API.graphql(
                graphqlOperation(mutations.updateAffiliation, variables)
            );
            //  *************************************
            //      got graphQL division affiliations response
            //  *************************************
            let profiles = {};
            if (affResponse?.data?.updateAffiliation?.id) {
                const divProfiles =
                    affResponse?.data?.getDivision?.affiliations?.items;
                // there are multiple roles that we want to organize
                // allProfiles: all the profiles that have status = active
                const activeProfiles = divProfiles.filter((a) => {
                    return a.status === 'active';
                });
                // team: all the profiles with status = active and role != guest
                const team = activeProfiles.filter((a) => {
                    return a.role !== 'guest';
                });
                // guests: all the profiles with status = active and role = guest
                const guests = activeProfiles.filter((a) => {
                    return a.role === 'guest';
                });
                // nonActives: all the profiles with status != active
                const nonActives = divProfiles.filter((a) => {
                    return a.status !== 'active';
                });
                const payload = {
                    actives: activeProfiles,
                    team: team,
                    guests: guests,
                    nonActives: nonActives,
                };
                return payload;
            }
            return {};
        } catch (error) {
            console.log('ERROR:', error);
            return thunkAPI.rejectWithValue(
                'PS:16-->>> something went wrong in remote createAsyncThunk'
            );
        }
    }
);
