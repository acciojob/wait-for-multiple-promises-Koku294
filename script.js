const output = document.getElementById("output");

    // Function to simulate a promise with a random delay between 1 and 3 seconds
    function createTimedPromise(index) {
      const delay = Math.random() * 2 + 1; // Between 1 and 3 seconds
      return new Promise((resolve) => {
        const start = performance.now();
        setTimeout(() => {
          const end = performance.now();
          const duration = (end - start) / 1000; // seconds
          resolve({ name: `Promise ${index + 1}`, time: duration });
        }, delay * 1000);
      });
    }

    async function trackPromises() {
      const startTime = performance.now();

      const promises = [
        createTimedPromise(0),
        createTimedPromise(1),
        createTimedPromise(2),
      ];

      const results = await Promise.all(promises);

      const endTime = performance.now();
      const totalTime = (endTime - startTime) / 1000;

      // Clear loading row
      output.innerHTML = "";

      // Add each promise result row
      results.forEach((result, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${result.name}</td>
          <td>${result.time.toFixed(3)}</td>
        `;
        output.appendChild(row);
      });

      // Add total row
      const totalRow = document.createElement("tr");
      totalRow.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>${totalTime.toFixed(3)}</strong></td>
      `;
      output.appendChild(totalRow);
    }

    // Start tracking
    trackPromises();