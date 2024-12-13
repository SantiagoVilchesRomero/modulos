import { Check } from './check.js';

async function fetchValvesStates() {
  try {
      const response = await fetch('http://localhost:3000/api/items');
      if (!response.ok) throw new Error('Error fetching data');
      return await response.json();
  } catch (error) {
      console.error('Error fetching valve states:', error);
      return [];
  }
}

const Cliente = {
  async send(data) {
      try {
          const response = await fetch('http://localhost:3000/api/items', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log('Item created:', responseData);
      } catch (error) {
          console.error('Error creating item:', error);
      }
  }
}

const check1 = new Check(document.getElementById("grupo1"),Cliente);
check1.addCheck("riego1");
check1.addCheck("riego2");

const check2 = new Check(document.getElementById("grupo2"),Cliente);
check2.addCheck("riego1");
check2.addCheck("riego2");

const check3 = new Check(document.getElementById("grupo3"),Cliente);
check3.addCheck("riego1");
check3.addCheck("riego2");