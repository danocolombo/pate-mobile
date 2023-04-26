/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      memberships {
        items {
          id
          name
          street
          city
          stateProv
          postalCode
          createdAt
          updatedAt
          divisionMembershipsId
          userMembershipsId
        }
        nextToken
      }
      createdAt
      updatedAt
      organizationDivisionsId
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
        memberships {
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
        memberships {
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
        memberships {
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
    listAffiliations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        memberships {
          nextToken
        }
        createdAt
        updatedAt
        organizationDivisionsId
      }
      registrations {
        items {
          id
          attendeeId
          attendeeFirstName
          attendeeLastName
          attendeeStreet
          attendeeCity
          attendeeStateProv
          attendeePostalCode
          attendeeEmail
          attendeePhone
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
        memberships {
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
    listEventLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    listEventContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      attendeeId
      attendeeFirstName
      attendeeLastName
      attendeeStreet
      attendeeCity
      attendeeStateProv
      attendeePostalCode
      attendeeEmail
      attendeePhone
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
        memberships {
          nextToken
        }
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
  }
`;
export const listRegistrations = /* GraphQL */ `
  query ListRegistrations(
    $filter: ModelRegistrationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegistrations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        attendeeId
        attendeeFirstName
        attendeeLastName
        attendeeStreet
        attendeeCity
        attendeeStateProv
        attendeePostalCode
        attendeeEmail
        attendeePhone
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
        memberships {
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
          attendeeId
          attendeeFirstName
          attendeeLastName
          attendeeStreet
          attendeeCity
          attendeeStateProv
          attendeePostalCode
          attendeeEmail
          attendeePhone
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
      memberships {
        items {
          id
          name
          street
          city
          stateProv
          postalCode
          createdAt
          updatedAt
          divisionMembershipsId
          userMembershipsId
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
        memberships {
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
export const getMembership = /* GraphQL */ `
  query GetMembership($id: ID!) {
    getMembership(id: $id) {
      id
      name
      street
      city
      stateProv
      postalCode
      member {
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
        memberships {
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
        memberships {
          nextToken
        }
        createdAt
        updatedAt
        organizationDivisionsId
      }
      createdAt
      updatedAt
      divisionMembershipsId
      userMembershipsId
    }
  }
`;
export const listMemberships = /* GraphQL */ `
  query ListMemberships(
    $filter: ModelMembershipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMemberships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        street
        city
        stateProv
        postalCode
        member {
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
        divisionMembershipsId
        userMembershipsId
      }
      nextToken
    }
  }
`;