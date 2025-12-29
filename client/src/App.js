import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>React Theme Switcher</h1>
      <p>This is light / dark theme project</p>
      <ThemeToggle />
    </div>
  );
}

export default App;