import { useQuery } from "@apollo/client";
import { GET_INCIDENT_BY_ID } from "../graphql/incidents";
import { useEffect, useState } from 'react';
import { Incident, Severity, Status } from '../types/app';

export default function useIncident(id?: number | null) {
  const [editing, setEditing] = useState<Incident>();

  const { data } = useQuery(GET_INCIDENT_BY_ID, { variables: { id }, skip: !id || id === 0 });

  useEffect(() => {
    if (data) setEditing(data.getIncidentById);
    else if (id === 0) setEditing({
      id: 0,
      title: '',
      description: '',
      severity: Severity.LOW,
      status: Status.OPEN
    })
    else setEditing(undefined);
  }, [id, data]);

  return { incident: editing ?? null, setIncident: setEditing };
}