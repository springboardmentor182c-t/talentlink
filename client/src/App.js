import './App.css';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

function App() {
  return (
    <div className="container">
      <h2>⭐ Review & Rating System</h2>
      <ReviewForm />
      <ReviewList />
    </div>
  );
}

export default App;
