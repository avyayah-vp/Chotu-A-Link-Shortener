import './App.css';
import Header from './components/Header';
import LinkShortForm from './components/LinkShortForm';
import ShortURLsList from './components/ShortURLsList';

function App() {
  return (
    <div className="App">
      <Header />
      <LinkShortForm />
      <ShortURLsList />
    </div>
  );
}

export default App;
