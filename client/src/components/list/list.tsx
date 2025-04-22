import './list.css';

import { useContext } from "react"
import { DataContext } from "../../App"
import IncidentTile from "../incident/incident";

export default function ListIncidents() {
  const { allIncidents } = useContext(DataContext);

  return (
    <div className="list-incidents">
      {allIncidents?.map(incident => <IncidentTile key={incident.id} {...incident} />) ?? <span>Currently no incidents!</span>}
    </div>
  )
}