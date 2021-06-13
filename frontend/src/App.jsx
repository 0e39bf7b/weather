import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import WeatherInfo from './components/weather-info';
import WeatherChart from './components/weather-chart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  async componentDidMount() {
    const response = await fetch('/measurements.json');

    if (response.ok) {
      const measurements = await response.json();
      this.setState({ measurements });
    }
  }

  render() {
    const measurements = this.state.measurements;

    if (!measurements) return null;

    if (measurements.length < 1) {
      return <h3>No Data</h3>;
    }

    const currentStats = measurements[measurements.length - 1];
    const prevStats = measurements.length > 1 ? measurements[measurements.length - 2] : null;

    return (<Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/temperature-chart">Temperature</Link></li>
          <li><Link to="/humidity-chart">Humidity</Link></li>
          <li><Link to="/pressure-chart">Pressure</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/temperature-chart">
          <WeatherChart title="Temperature" measurements={measurements} dataKey="temperature" />
        </Route>
        <Route path="/humidity-chart">
          <WeatherChart title="Humidity" measurements={measurements} dataKey="humidity" />
        </Route>
        <Route path="/pressure-chart">
          <WeatherChart title="Pressure" measurements={measurements} dataKey="pressure" />
        </Route>
        <Route path="/">
          <WeatherInfo currentStats={currentStats} prevStats={prevStats} />
        </Route>
      </Switch>
    </Router>);
  }
}

export default App;
