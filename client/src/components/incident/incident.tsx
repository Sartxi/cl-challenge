import './incident.css';
import { ConfirmProps, Incident, Status } from "../../types/app";
import { useContext, useState } from 'react';
import { DataContext } from '../../App';
import { useMutation } from '@apollo/client';
import { DELETE_INCIDENT, UPDATE_INCIDENT } from '../../graphql/incidents';
import ConfirmDialog from '../confirm/confirm';

export default function IncidentTile({ id, title, description, severity, status }: Incident) {
  const { setEditIncident, fetchIncidents, setToast } = useContext(DataContext);
  const [confirm, setConfirm] = useState<ConfirmProps>();

  const level = severity.toString().toLowerCase();
  const statusOptions = Object.keys(Status).map((key: string) => Status[key as keyof typeof Status]);

  const [updateIncident] = useMutation(UPDATE_INCIDENT);
  const [deleteIncident] = useMutation(DELETE_INCIDENT);

  const updateStatus = (data: string) => {
    updateIncident({ variables: { id, title, description, severity, status: data } });
    setToast?.({ text: `Successfully updated the incident status!`, duration: 1500, status: 'success' });
    fetchIncidents?.();
  }

  const remove = async () => {
    if (id) {
      setConfirm({
        text: 'Are you sure you want to delete this incident record?',
        callback: async () => {
          await deleteIncident({ variables: { id } });
          setToast?.({ text: `Successfully removed the incident!`, duration: 1500, status: 'success' });
          fetchIncidents?.();
        },
        close: () => setConfirm(undefined)
      })
    }
  }

  return (
    <>
      {confirm ? <ConfirmDialog {...confirm} /> : <span />}
      <div className="incident">
        <div className={`badge ${level}`}>
          {level}
        </div>
        <div className='info'>
          <div className='details'>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className='tool-box'>
            <img src='/edit.svg' alt='edit incident' onClick={() => setEditIncident?.(id)} />
            <img src='/remove.svg' alt='remove incident' onClick={() => remove()} />
            <select name="severity" value={status} id="Severity" onChange={(e) => updateStatus(e.target.value)}>
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
