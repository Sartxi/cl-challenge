import './header.css';
import useTheme from '../../hooks/useTheme';
import { useContext } from 'react';
import { DataContext } from '../../App';

export default function Header() {
  const { isDark, setIsDark } = useTheme();
  const { setEditIncident } = useContext(DataContext);

  return (
    <div className="header">
      <h1>
        <img src='/incidents.svg' alt='incident report' />
        Incidents Dashboard
      </h1>
      <div className='tools'>
        <img className='icon' src={isDark ? '/light.svg' : '/dark.svg'} alt='theme' onClick={() => setIsDark(!isDark)} />
        <img className='icon' src='/addIcon.svg' alt='add incident' onClick={() => setEditIncident?.(0)} />
      </div>
    </div>
  )
}
