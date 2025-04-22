import './App.css';
import { createContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_INCIDENTS } from './graphql/incidents';
import { GlobalState, ToastProps } from './types/app';
import Header from './components/header/header';
import ListIncidents from './components/list/list';
import ErrorPod from './components/error/error';
import IncidentForm from './components/editor/editor';
import Toast from './components/toast/toast';

const dataObj: GlobalState = {
  allIncidents: [],
  fetchIncidents: undefined,
  editIncident: undefined,
  setEditIncident: undefined,
  toast: undefined,
  setToast: undefined,
}
export const DataContext = createContext(dataObj);

function App() {
  const [isEditing, setIsEditing] = useState<number | null>();
  const [showToast, setShowToast] = useState<ToastProps | null>();

  const { loading, error, data, refetch } = useQuery(GET_INCIDENTS);
  const allIncidents = data?.getIncidents ?? [];

  if (error) return <ErrorPod error={error} />
  return (
    <DataContext.Provider value={{
      allIncidents,
      fetchIncidents: refetch,
      editIncident: isEditing,
      setEditIncident: (id: number | null) => setIsEditing(id),
      toast: showToast,
      setToast: (toast: ToastProps | null) => setShowToast(toast),
    }}>
      <div className='incidents'>
        <IncidentForm />
        <Header />
        <div className='content'>
          {loading ? <div className='loader'></div> : <ListIncidents />}
        </div>
        <Toast />
      </div>
    </DataContext.Provider>
  );
}

export default App;
