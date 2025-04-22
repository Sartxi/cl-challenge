import './editor.css';

import { useMutation } from "@apollo/client";
import { ADD_INCIDENT, UPDATE_INCIDENT } from "../../graphql/incidents";
import { useContext, useRef } from 'react';
import { DataContext } from '../../App';
import { Incident, Severity } from '../../types/app';
import useIncident from '../../hooks/useIncident';


export default function IncidentForm() {
  const dialogRef = useRef(null);
  const { editIncident, setEditIncident, fetchIncidents, setToast } = useContext(DataContext);
  const { incident, setIncident } = useIncident(editIncident);

  const severityOptions = Object.keys(Severity).map((key: string) => Severity[key as keyof typeof Severity]);
  const updateForm = (field: any, data: any) => {
    const update = { ...incident, [field]: data } as Incident;
    setIncident(update);
  };

  const [addIncident] = useMutation(ADD_INCIDENT);
  const [updateIncident] = useMutation(UPDATE_INCIDENT);

  const handleAddIncident = () => {
    if (incident) {
      const variables = {
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        status: incident.status
      };
      if (incident.id === 0) addIncident({ variables });
      else updateIncident({ variables: { ...variables, id: incident.id } });

      setToast?.({ text: `Successfully ${incident.id === 0 ? 'added' : 'edited'} the incident!`, duration: 1500, status: 'success' });
      fetchIncidents?.();
    }
    setEditIncident?.(null)
  }

  if (!incident) return <span />;
  return (
    <>
      <div className='dialog-backdrop'></div>
      <dialog ref={dialogRef} open className='edit-form'>
        <div className='form'>
          <h2>{incident.id === 0 ? 'New Incident' : 'Edit Incident'}</h2>
          <div>
            <label>Title:</label>
            <input type='text' value={incident.title} placeholder='Add a title' onChange={(e) => updateForm('title', e.target.value)} />
          </div>
          <div>
            <label>Description:</label>
            <input type='text' value={incident.description} placeholder='Add a description' onChange={(e) => updateForm('description', e.target.value)} />
          </div>
          <div>
            <label>Severity</label>
            <select name="severity" id="Severity" onChange={(e) => updateForm('severity', e.target.value)}>
              {severityOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className='btns'>
          <button className='btn' onClick={() => handleAddIncident()}>Save</button>
          <button className='btn muted' onClick={() => setEditIncident?.(null)}>Close</button>
        </div>
      </dialog>
    </>
  )
}