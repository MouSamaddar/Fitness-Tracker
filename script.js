const activityList = document.getElementById('activity-list');
    const addActivityButton = document.getElementById('add-activity');
    const totalDuration = document.getElementById('total-duration');
    const averageDuration = document.getElementById('average-duration');
    const recommendWorkoutButton = document.getElementById('recommend-workout');

    let activities = [];

    function renderActivities() {
      activityList.innerHTML = '';
      let totalDuration = 0;
      activities.forEach((activity, index) => {
        const activityElement = document.createElement('li');
        activityElement.textContent = `${activity.activity} - ${activity.duration} minutes`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          activities.splice(index, 1);
          renderActivities();
        });
        activityElement.appendChild(deleteButton);
        activityList.appendChild(activityElement);
        totalDuration += activity.duration;
      });
      document.getElementById('total-duration').textContent = `Total Duration: ${totalDuration} minutes`;
      document.getElementById('average-duration').textContent = `Average Duration: ${Math.round(totalDuration / activities.length)} minutes`;
    }

    addActivityButton.addEventListener('click', () => {
      const activity = document.getElementById('activity').value;
      const duration = parseInt(document.getElementById('duration').value);
      if (!activity || !duration) {
        alert('Please enter a valid activity and duration!');
        return;
      }
      activities.push({ activity, duration });
      renderActivities();
    });

    recommendWorkoutButton.addEventListener('click', () => {
      const averageDuration = activities.reduce((total, activity) => total + activity.duration, 0) / activities.length;
      let recommendation;
      if (averageDuration < 30) {
        recommendation = 'You should increase your workout duration.';
      } else if (averageDuration < 60) {
        recommendation = 'Your workout duration is good.';
      } else {
        recommendation = 'You should decrease your workout duration.';
      }
      alert(recommendation);
    });