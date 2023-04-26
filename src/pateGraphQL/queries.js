/* eslint-disable */

export const getOrganization = /* GraphQL */ `
    query GetOrganization($id: ID!) {
        getOrganization(id: $id) {
            id
            appName
            available
            category
            code
            description
            exposure
            label
            name
            title
            value
            divisions {
                items {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const listOrganizations = /* GraphQL */ `
    query ListOrganizations(
        $filter: ModelOrganizationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listOrganizations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                appName
                available
                category
                code
                description
                exposure
                label
                name
                title
                value
                divisions {
                    nextToken
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getDivision = /* GraphQL */ `
    query GetDivision($id: ID!) {
        getDivision(id: $id) {
            id
            code
            divCompKey
            organization {
                id
                appName
                available
                category
                code
                description
                exposure
                label
                name
                title
                value
                divisions {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            defaultUsers {
                items {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                nextToken
            }
            createdAt
            updatedAt
            organizationDivisionsId
        }
    }
`;
export const getDivisionEvents = /* GraphQL */ `
    query MyQuery($divId: ID!, $startDate: String) {
        getDivision(id: $divId) {
            code
            events(
                sortDirection: ASC
                filter: { eventDate: { ge: $startDate } }
            ) {
                items {
                    id
                    name
                    eventCompKey
                    eventDate
                    startTime
                    endTime
                    status
                    message
                    graphic
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    meal {
                        id
                        message
                        deadline
                        cost
                        startTime
                        plannedCount
                        actualCount
                    }
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    contact {
                        id
                        firstName
                        lastName
                        phone
                        email
                    }
                    coordinator {
                        id
                        firstName
                        lastName
                        email
                        phone
                    }
                }
            }
        }
    }
`;
export const listDivisions = /* GraphQL */ `
    query ListDivisions(
        $filter: ModelDivisionFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            nextToken
        }
    }
`;
export const getAffiliation = /* GraphQL */ `
    query GetAffiliation($id: ID!) {
        getAffiliation(id: $id) {
            id
            role
            status
            user {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            createdAt
            updatedAt
            divisionAffiliationsId
            userAffiliationsId
        }
    }
`;
export const listAffiliations = /* GraphQL */ `
    query ListAffiliations(
        $filter: ModelAffiliationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listAffiliations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                role
                status
                user {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                createdAt
                updatedAt
                divisionAffiliationsId
                userAffiliationsId
            }
            nextToken
        }
    }
`;
export const getCoordinatorEvents = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            defaultDivision {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            residence {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                residents {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            createdAt
            updatedAt
            divisionDefaultUsersId
            residenceResidentsId
        }
    }
`;

export const getCoordinatorEvents2 = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            events {
            items {
                id
                eventDate
                name
                location{
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                }
                message
                        status
                startTime
                endTime
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                meal{
                    id
                    message
                    startTime
                    cost
                    deadline
                    plannedCount
                    actualCount
                }
                contact{
                    id
                    firstName
                    lastName
                    phone
                    email
                }
            }
        }
    }
`;

export const getEvent = /* GraphQL */ `
    query GetEvent($id: ID!) {
        getEvent(id: $id) {
            id
            eventDate
            eventCompKey
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            coordinator {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            status
            plannedCount
            actualCount
            mealPlannedCount
            mealActualCount
            startTime
            endTime
            message
            name
            graphic
            location {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            contact {
                id
                firstName
                lastName
                email
                phone
                street
                city
                stateProv
                postalCode
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            meal {
                id
                deadline
                cost
                plannedCount
                actualCount
                startTime
                message
                event {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                createdAt
                updatedAt
                mealEventId
            }
            createdAt
            updatedAt
            divisionEventsId
            eventLocationEventsId
            eventContactEventsId
            userEventsId
            eventMealId
        }
    }
`;
export const listEvents = /* GraphQL */ `
    query ListEvents(
        $filter: ModelEventFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                registrations {
                    nextToken
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    createdAt
                    updatedAt
                    mealEventId
                }
                createdAt
                updatedAt
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            nextToken
        }
    }
`;
export const getEventLocation = /* GraphQL */ `
    query GetEventLocation($id: ID!) {
        getEventLocation(id: $id) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const listEventLocations = /* GraphQL */ `
    query ListEventLocations(
        $filter: ModelEventLocationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listEventLocations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getEventContact = /* GraphQL */ `
    query GetEventContact($id: ID!) {
        getEventContact(id: $id) {
            id
            firstName
            lastName
            email
            phone
            street
            city
            stateProv
            postalCode
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const listEventContacts = /* GraphQL */ `
    query ListEventContacts(
        $filter: ModelEventContactFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listEventContacts(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                firstName
                lastName
                email
                phone
                street
                city
                stateProv
                postalCode
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getMeal = /* GraphQL */ `
    query GetMeal($id: ID!) {
        getMeal(id: $id) {
            id
            deadline
            cost
            plannedCount
            actualCount
            startTime
            message
            event {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                registrations {
                    nextToken
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    createdAt
                    updatedAt
                    mealEventId
                }
                createdAt
                updatedAt
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            createdAt
            updatedAt
            mealEventId
        }
    }
`;
export const listMeals = /* GraphQL */ `
    query ListMeals(
        $filter: ModelMealFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listMeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                deadline
                cost
                plannedCount
                actualCount
                startTime
                message
                event {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                createdAt
                updatedAt
                mealEventId
            }
            nextToken
        }
    }
`;

export const getRegistration = /* GraphQL */ `
    query GetRegistration($id: ID!) {
        getRegistration(id: $id) {
            id
            attendanceCount
            attendeeId
            attendeeFirstName
            attendeeLastName
            attendeeEmail
            attendeePhone
            attendeeStreet
            attendeeCity
            attendeeStateProv
            attendeePostalCode
            mealCount
            membershipName
            membershipStreet
            membershipCity
            membershipStateProv
            membershipPostalCode
            event {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    organizationDivisionsId
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    mealEventId
                }
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            registrar {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            eventRegistrationsId
            userRegistrationsId
        }
    }
`;
export const getRegistrations = /* GraphQL */ `
    query GetRegistrations($id: ID!) {
        getEvent(id: $id) {
            registrations {
                items {
                    id
                    attendeeFirstName
                    attendeeLastName
                    attendeeEmail
                    attendeePhone
                    attendeeStreet
                    attendeeCity
                    attendeeStateProv
                    attendeePostalCode
                    attendanceCount
                    mealCount
                    membershipName
                    membershipStreet
                    membershipCity
                    membershipStateProv
                    membershipPostalCode
                    registrar {
                        id
                        firstName
                        lastName
                        email
                        phone
                    }
                }
            }
        }
    }
`;
export const listRegistrations = /* GraphQL */ `
    query ListRegistrations(
        $filter: ModelRegistrationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listRegistrations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                event {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                attendanceCount
                mealCount
                membershipName
                membershipStreet
                membershipCity
                membershipStateProv
                membershipPostalCode
                registrar {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                createdAt
                updatedAt
                eventRegistrationsId
                userRegistrationsId
            }
            nextToken
        }
    }
`;
export const getResidence = /* GraphQL */ `
    query GetResidence($id: ID!) {
        getResidence(id: $id) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
            residents {
                items {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const listResidences = /* GraphQL */ `
    query ListResidences(
        $filter: ModelResidenceFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listResidences(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                residents {
                    nextToken
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;
export const getUser = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            defaultDivision {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            residence {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                residents {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    membershipName
                    membershipStreet
                    membershipCity
                    membershipStateProv
                    membershipPostalCode
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            createdAt
            updatedAt
            divisionDefaultUsersId
            residenceResidentsId
        }
    }
`;
export const listUsers = /* GraphQL */ `
    query ListUsers(
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            nextToken
        }
    }
`;
export const getRepRallies = /* GraphQL */ `
    query MyQuery($divisionId: ID!, $coordinatorId: ID!) {
        listDivisions(filter: { id: { eq: $divisionId } }) {
            items {
                events(filter: { userEventsId: { eq: $coordinatorId } }) {
                    items {
                        id
                        eventDate
                        startTime
                        endTime
                        status
                        name
                        actualCount
                        plannedCount
                        mealActualCount
                        mealPlannedCount
                        location {
                            street
                            city
                            stateProv
                            postalCode
                        }
                        coordinator {
                            id
                            firstName
                            lastName
                        }
                    }
                }
            }
        }
    }
`;

export const getAllDivisionEvents2 = /* GraphQL */ `
    query MyQuery($id: ID!) {
        getDivision(id: $id) {
            events {
                items {
                    id
                    name
                    eventDate
                    startTime
                    endTime
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    graphic
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    meal {
                        id
                        deadline
                        startTime
                        cost
                        message
                        plannedCount
                        actualCount
                    }
                    contact {
                        id
                        firstName
                        lastName
                        street
                        city
                        stateProv
                        postalCode
                        email
                        phone
                    }
                    coordinator {
                        id
                        sub
                        firstName
                        lastName
                        username
                    }
                }
            }
        }
    }
`;
//      GET ACTIVE DIVISION RALLIES
export const getDivisionEventsByDateStatus = /* GraphQL */ `
    query MyQuery($id: ID!, $eq: String!, $ge: String!) {
        getDivision(id: $id) {
            events(filter: { status: { eq: $eq }, eventDate: { ge: $ge } }) {
                items {
                    id
                    name
                    eventDate
                    startTime
                    endTime
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    meal {
                        id
                        deadline
                        startTime
                        cost
                        message
                        plannedCount
                        actualCount
                    }
                    contact {
                        id
                        firstName
                        lastName
                        street
                        city
                        stateProv
                        postalCode
                        email
                        phone
                    }
                    coordinator {
                        id
                        sub
                        firstName
                        lastName
                        username
                    }
                }
            }
        }
    }
`;

export const getAllDivisionEvents = /* GraphQL */ `
    query MyQuery($divId: ID!) {
        getDivision(id: $divId) {
            id
            code
            divCompKey
            events(sortDirection: ASC) {
                items {
                    id
                    name
                    eventCompKey
                    eventDate
                    startTime
                    endTime
                    status
                    message
                    graphic
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    meal {
                        id
                        message
                        deadline
                        cost
                        startTime
                        plannedCount
                        actualCount
                    }
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    contact {
                        id
                        firstName
                        lastName
                        phone
                        email
                    }
                    coordinator {
                        id
                        firstName
                        lastName
                        email
                        phone
                    }
                    division {
                        id
                        code
                        divCompKey
                        organization {
                            id
                            code
                            description
                        }
                    }
                }
            }
        }
    }
`;
export const getDivisionAffiliations = /* GraphQL */ `
    query MyQuery($divId: ID!) {
        getDivision(id: $divId) {
            id
            affiliations {
                items {
                    id
                    role
                    status
                    user {
                        id
                        username
                        firstName
                        lastName
                        email
                        phone
                        residence {
                            street
                            city
                            stateProv
                            postalCode
                        }
                        memberships(
                            filter: { divisionMembershipsId: { eq: $divId } }
                        ) {
                            items {
                                id
                                name
                                street
                                city
                                stateProv
                                postalCode
                                divisionMembershipsId
                            }
                        }
                    }
                }
            }
        }
    }
`;
export const getProfileBySub = /* GraphQL */ `
    query MyQuery($id: String) {
        listUsers(filter: { sub: { eq: $id } }) {
            items {
                id
                sub
                firstName
                lastName
                username
                email
                phone
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                }
                registrations {
                    items {
                        id
                        attendanceCount
                        attendeeId
                        attendeeFirstName
                        attendeeLastName
                        attendeeStreet
                        attendeeCity
                        attendeeStateProv
                        attendeePostalCode
                        mealCount
                        membershipName
                        membershipStreet
                        membershipCity
                        membershipStateProv
                        membershipPostalCode
                        event {
                            id
                            name
                            eventDate
                            plannedCount
                            actualCount
                            mealPlannedCount
                            mealActualCount
                            location {
                                city
                                stateProv
                            }
                            meal {
                                id
                            }
                        }
                        registrar {
                            id
                            firstName
                            lastName
                        }
                    }
                }
                affiliations {
                    items {
                        id
                        status
                        role
                        division {
                            id
                            code
                            organization {
                                id
                                appName
                                available
                                category
                                description
                                exposure
                                label
                                name
                                value
                                code
                                title
                            }
                        }
                    }
                }
                defaultDivision {
                    id
                    code
                    organization {
                        id
                        code
                        title
                    }
                }
                memberships {
                    items {
                        id
                        name
                        street
                        city
                        stateProv
                        postalCode
                        division {
                            id
                            code
                            organization {
                                code
                            }
                        }
                    }
                }
                events(
                    filter: {
                        divisionEventsId: {
                            eq: "fffedde6-5d5a-46f0-a3ac-882a350edc64"
                        }
                    }
                ) {
                    items {
                        id
                        status
                        eventDate
                        startTime
                        endTime
                        name
                        location {
                            city
                            stateProv
                        }
                    }
                }
            }
        }
    }
`;

export const getEventDetails = /* GraphQL */ `
    query GetEvent($id: ID!) {
        getEvent(id: $id) {
            id
            status
            name
            eventDate
            startTime
            endTime
            graphic
            message
            actualCount
            plannedCount
            mealActualCount
            mealPlannedCount
            location {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
            }
            contact {
                id
                firstName
                lastName
                email
                phone
                street
                city
                stateProv
                postalCode
            }
            eventMealId
            meal {
                id
                message
                cost
                deadline
                startTime
                plannedCount
                actualCount
            }
            coordinator {
                id
                firstName
                lastName
                email
                phone
            }
            division {
                id
                code
                organization {
                    id
                    code
                }
            }
            registrations {
                items {
                    id
                    attendanceCount
                    attendeeId
                    attendeeFirstName
                    attendeeLastName
                    mealCount
                    membershipName
                    membershipStreet
                    membershipCity
                    membershipStateProv
                    membershipPostalCode
                    registrar {
                        id
                        firstName
                        lastName
                        email
                        phone
                        residence {
                            street
                            city
                            stateProv
                            postalCode
                        }
                    }
                }
            }
        }
    }
`;

export const getEventDetailsNoRegistrations = /* GraphQL */ `
    query GetEvent($id: ID!) {
        getEvent(id: $id) {
            id
            eventDate
            eventCompKey
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                organizationDivisionsId
            }
            coordinator {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                divisionDefaultUsersId
                residenceResidentsId
            }
            status
            plannedCount
            actualCount
            mealPlannedCount
            mealActualCount
            startTime
            endTime
            message
            name
            graphic
            location {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
            }
            contact {
                id
                firstName
                lastName
                email
                phone
                street
                city
                stateProv
                postalCode
            }
            meal {
                id
                deadline
                cost
                plannedCount
                actualCount
                startTime
                message
                mealEventId
            }
            divisionEventsId
            eventLocationEventsId
            eventContactEventsId
            userEventsId
            eventMealId
        }
    }
`;
export const getCurrentUser = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            residence {
                id
                street
                city
                stateProv
                postalCode
            }
            affiliations {
                items {
                    divisionAffiliationsId
                    id
                    role
                    status
                }
            }
            defaultDivision {
                code
                id
            }
            events {
                items {
                    id
                }
            }
            memberships {
                items {
                    id
                    name
                    street
                    city
                    stateProv
                    postalCode
                    division {
                        id
                        code
                    }
                }
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    membershipName
                    membershipStreet
                    membershipCity
                    membershipStateProv
                    membershipPostalCode
                    event {
                        id
                    }
                }
            }
        }
    }
`;

export const getCurrentUserRegistrations = /* GraphQL */ `
    query ListRegistrations($id: ID!) {
        listRegistrations(filter: { userRegistrationsId: { eq: $id } }) {
            items {
                id
                attendanceCount
                attendeeId
                attendeeFirstName
                attendeeLastName
                attendeePhone
                attendeeEmail
                attendeeStreet
                attendeeCity
                attendeeStateProv
                attendeePostalCode
                mealCount
                membershipName
                membershipStreet
                membershipCity
                membershipStateProv
                membershipPostalCode
                event {
                    id
                    eventDate
                    eventCompKey
                    division {
                        id
                        code
                        divCompKey
                        organizationDivisionsId
                    }
                    coordinator {
                        id
                        sub
                        username
                        firstName
                        lastName
                        email
                        phone
                        divisionDefaultUsersId
                        residenceResidentsId
                    }
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    contact {
                        id
                        firstName
                        lastName
                        email
                        phone
                        street
                        city
                        stateProv
                        postalCode
                    }
                    meal {
                        id
                        deadline
                        cost
                        plannedCount
                        actualCount
                        startTime
                        message
                        mealEventId
                    }
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
            }
        }
    }
`;
export const getCurrentUserRegistrations2 = /* GraphQL */ `
    query ListRegistrations($id: ID!) {
        listRegistrations(filter: { userRegistrationsId: { eq: $id } }) {
            items {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                }
                affiliations {
                    items {
                        divisionAffiliationsId
                        id
                        role
                        status
                    }
                }
                defaultDivision {
                    code
                    id
                }
                events {
                    items {
                        id
                    }
                }
                memberships {
                    items {
                        id
                        name
                        street
                        city
                        stateProv
                        postalCode
                        division {
                            id
                            code
                        }
                    }
                }
                registrations {
                    items {
                        id
                        attendanceCount
                        mealCount
                        event {
                            id
                        }
                    }
                }
            }
        }
    }
`;

export const listMigrationUsers = /* GraphQL */ `
    query ListUsers($id: ID!) {
        listUsers(filter: { divisionDefaultUsersId: { eq: $id } }, limit: 10) {
            items {
                id
                sub
                username
                firstName
                lastName
                email
                phone
            }
            nextToken
        }
    }
`;
export const getDivUsers = /* GraphQL */ `
    query MyQuery($id: ID!) {
        listUsers(filter: { divisionDefaultUsersId: { eq: $id } }) {
            items {
                id
                sub
                username
                firstName
                lastName
                email
                phone
            }
        }
    }
`;