import './list.css';

import { useContext, useState } from "react"
import { DataContext } from "../../App"
import IncidentTile from "../incident/incident";
import { Incident, Severity, Status } from '../../types/app';
import useStats from '../../hooks/useStats';

const itemsPerPage = 6;

export default function ListIncidents() {
  const { allIncidents } = useContext(DataContext);
  const { severityOptions, statusOptions } = useStats();

  const [page, setPage] = useState(1);
  const [filterSeverity, setFilterSeverity] = useState<Severity>();
  const [filterStatus, setFilterStatus] = useState<Status>();

  const filter = (i: Incident) => {
    let filter = i !== undefined;
    if (filterSeverity) filter = i.severity === filterSeverity;
    if (filterStatus) filter = filter && i.status === filterStatus;
    return filter ?? i;
  };

  const incidents = allIncidents?.filter(filter)?.map(incident => <IncidentTile key={incident.id} {...incident} />);
  const maxPage = incidents ? Math.ceil(incidents.length / itemsPerPage) : 0;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageIncidents = incidents && incidents.slice(startIndex, endIndex);

  const prevPage = () => setPage((page) => Math.max(page - 1, 1));
  const nextPage = () => setPage((page) => Math.min(page + 1, maxPage));

  return (
    <div className="list-incidents">
      <div className='list-tools'>
        <div className='filters'>
          <div className='btns'>
            {severityOptions.map(sev => <button key={sev} className={`btn sm ${filterSeverity === sev ? 'active' : 'muted'}`} onClick={() => setFilterSeverity(filterSeverity === sev ? undefined : sev)}>{sev}</button>)}
          </div>
          <div className='btns'>
            {statusOptions.map(sev => <button key={sev} className={`btn sm ${filterStatus === sev ? 'active' : 'muted'}`} onClick={() => setFilterStatus(filterStatus === sev ? undefined : sev)}>{sev}</button>)}
          </div>
        </div>
        {incidents && incidents?.length >= itemsPerPage ? (
          <div className='paging'>
            <div className='btns'>
              <button className='btn muted sm' onClick={prevPage} disabled={page === 1}>
                <img src='/prev.svg' alt='previous' />
              </button>
              <button className='btn muted sm' onClick={nextPage} disabled={page === maxPage}>
                <img src='/next.svg' alt='next' />
              </button>
            </div>
          </div>
        ) : <span />}
      </div>
      <div className='incidents-list'>
        {incidents?.length ? pageIncidents : <span className='none'>{filterSeverity || filterStatus ? 'No Incidents match your filters' : 'Currently no incidents reported!'}</span>}
      </div>
    </div>
  )
}