import React from 'react';
import {
  MenuItem,
  Select,
} from '@material-ui/core';
import { useMutation, ApolloError, useQuery } from '@apollo/client';
import PROFESSIONAL_PROFILE_V1 from '../mutations/changeProfessionalProfileV1.graphql';
import GET_PROFESSIONAL_PROFILE_QUERY from '../queries/get-professional-profile.graphql';
import {
  ProfessionalProfileData,
} from '../types/get-professional-profile-types';
import professionalId from '../global-variables';

export default function StateDropDown(): JSX.Element {
  const [value, setValue] = React.useState<string>('');

  // Query
  const {
    loading, data,
  } = useQuery<ProfessionalProfileData>(GET_PROFESSIONAL_PROFILE_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      getProfessionalProfessionalId: professionalId,
    },
  });

  // Mutations
  const [sendEditProfileV1,
  ] = useMutation(PROFESSIONAL_PROFILE_V1);

  React.useEffect(() => {
    if (!loading && data) {
      setValue(data.data?.state ? data.data.state : 'AVAILABLE');
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
    const variables = {
      editProfessionalProfessionalId: professionalId,
      editProfessionalInput: {
        state: event.target.value,
      },
    };
    sendEditProfileV1({ variables }).catch((_error: ApolloError) => { throw (_error); });
  };

  return (
    <div style={{ paddingRight: '5%', maxWidth: '35%', width: '35%' }}>
      <Select labelId="label" id="select" value={value} onChange={handleChange}>
        <MenuItem value="AVAILABLE">Disponible</MenuItem>
        <MenuItem value="UNAVAILABLE">No Disponible</MenuItem>
        <MenuItem value="MEDICAL">Licencia Médica</MenuItem>
        <MenuItem value="HOLIDAYS">Vacaciones</MenuItem>
        <MenuItem value="WORKING">Trabajando-Contratado</MenuItem>
      </Select>
    </div>

  );
}
