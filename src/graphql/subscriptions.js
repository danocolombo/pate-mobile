/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onCreateOrganization(filter: $filter) {
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onUpdateOrganization(filter: $filter) {
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onDeleteOrganization(filter: $filter) {
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
export const onCreateDivision = /* GraphQL */ `
  subscription OnCreateDivision($filter: ModelSubscriptionDivisionFilterInput) {
    onCreateDivision(filter: $filter) {
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
export const onUpdateDivision = /* GraphQL */ `
  subscription OnUpdateDivision($filter: ModelSubscriptionDivisionFilterInput) {
    onUpdateDivision(filter: $filter) {
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
export const onDeleteDivision = /* GraphQL */ `
  subscription OnDeleteDivision($filter: ModelSubscriptionDivisionFilterInput) {
    onDeleteDivision(filter: $filter) {
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
export const onCreateAffiliation = /* GraphQL */ `
  subscription OnCreateAffiliation(
    $filter: ModelSubscriptionAffiliationFilterInput
  ) {
    onCreateAffiliation(filter: $filter) {
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
export const onUpdateAffiliation = /* GraphQL */ `
  subscription OnUpdateAffiliation(
    $filter: ModelSubscriptionAffiliationFilterInput
  ) {
    onUpdateAffiliation(filter: $filter) {
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
export const onDeleteAffiliation = /* GraphQL */ `
  subscription OnDeleteAffiliation(
    $filter: ModelSubscriptionAffiliationFilterInput
  ) {
    onDeleteAffiliation(filter: $filter) {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreateEventLocation = /* GraphQL */ `
  subscription OnCreateEventLocation(
    $filter: ModelSubscriptionEventLocationFilterInput
  ) {
    onCreateEventLocation(filter: $filter) {
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
export const onUpdateEventLocation = /* GraphQL */ `
  subscription OnUpdateEventLocation(
    $filter: ModelSubscriptionEventLocationFilterInput
  ) {
    onUpdateEventLocation(filter: $filter) {
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
export const onDeleteEventLocation = /* GraphQL */ `
  subscription OnDeleteEventLocation(
    $filter: ModelSubscriptionEventLocationFilterInput
  ) {
    onDeleteEventLocation(filter: $filter) {
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
export const onCreateEventContact = /* GraphQL */ `
  subscription OnCreateEventContact(
    $filter: ModelSubscriptionEventContactFilterInput
  ) {
    onCreateEventContact(filter: $filter) {
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
export const onUpdateEventContact = /* GraphQL */ `
  subscription OnUpdateEventContact(
    $filter: ModelSubscriptionEventContactFilterInput
  ) {
    onUpdateEventContact(filter: $filter) {
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
export const onDeleteEventContact = /* GraphQL */ `
  subscription OnDeleteEventContact(
    $filter: ModelSubscriptionEventContactFilterInput
  ) {
    onDeleteEventContact(filter: $filter) {
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
export const onCreateMeal = /* GraphQL */ `
  subscription OnCreateMeal($filter: ModelSubscriptionMealFilterInput) {
    onCreateMeal(filter: $filter) {
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
export const onUpdateMeal = /* GraphQL */ `
  subscription OnUpdateMeal($filter: ModelSubscriptionMealFilterInput) {
    onUpdateMeal(filter: $filter) {
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
export const onDeleteMeal = /* GraphQL */ `
  subscription OnDeleteMeal($filter: ModelSubscriptionMealFilterInput) {
    onDeleteMeal(filter: $filter) {
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
export const onCreateRegistration = /* GraphQL */ `
  subscription OnCreateRegistration(
    $filter: ModelSubscriptionRegistrationFilterInput
  ) {
    onCreateRegistration(filter: $filter) {
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
export const onUpdateRegistration = /* GraphQL */ `
  subscription OnUpdateRegistration(
    $filter: ModelSubscriptionRegistrationFilterInput
  ) {
    onUpdateRegistration(filter: $filter) {
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
export const onDeleteRegistration = /* GraphQL */ `
  subscription OnDeleteRegistration(
    $filter: ModelSubscriptionRegistrationFilterInput
  ) {
    onDeleteRegistration(filter: $filter) {
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
export const onCreateResidence = /* GraphQL */ `
  subscription OnCreateResidence(
    $filter: ModelSubscriptionResidenceFilterInput
  ) {
    onCreateResidence(filter: $filter) {
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
export const onUpdateResidence = /* GraphQL */ `
  subscription OnUpdateResidence(
    $filter: ModelSubscriptionResidenceFilterInput
  ) {
    onUpdateResidence(filter: $filter) {
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
export const onDeleteResidence = /* GraphQL */ `
  subscription OnDeleteResidence(
    $filter: ModelSubscriptionResidenceFilterInput
  ) {
    onDeleteResidence(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateMembership = /* GraphQL */ `
  subscription OnCreateMembership(
    $filter: ModelSubscriptionMembershipFilterInput
  ) {
    onCreateMembership(filter: $filter) {
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
export const onUpdateMembership = /* GraphQL */ `
  subscription OnUpdateMembership(
    $filter: ModelSubscriptionMembershipFilterInput
  ) {
    onUpdateMembership(filter: $filter) {
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
export const onDeleteMembership = /* GraphQL */ `
  subscription OnDeleteMembership(
    $filter: ModelSubscriptionMembershipFilterInput
  ) {
    onDeleteMembership(filter: $filter) {
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
