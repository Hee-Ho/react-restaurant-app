import React from 'react';
import './Interface.css';
import { NavToClientApp } from '../../components/navigation/client-button.component';
import { NavToRestaurantApp } from '../../components/navigation/restaurant-button.component';

/**
 * Sceen 1
 * ● Students must be able to see all available courses
 * ● Students must be able to register for classes
 * Note: When registering for classes the TimeOfDay must be considered. Students are not allowed to register in multiple classes that overlap on time.
 *
 * Screen 2
 * ● Students must be able to drop classes they are registered in
 * ● Students must be able to see all courses they are registered in
 */

function Interface() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <NavToClientApp/> <NavToRestaurantApp/>
        </p>
      </header>
    </div>
  );
}

export default Interface;
