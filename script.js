<script>
  const output = document.getElementById("output");

  // Function that returns a Promise resolving after 1–3 seconds
  function createTimedPromise(index) {
    const delay = Math.random() * 2 + 1; // 1 to 3 seconds
    return new Promise((resolve) => {
      const start = performance.now();
      setTimeout(() => {
        const end = performance.now();
        const duration = (end - start) / 1000;
        resolve({ name: `Promise ${index + 1}`, time: duration });
      }, delay * 1000);
    });
  }

  async function trackPromises() {
    // Clear any existing rows and show loading
    output.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;

    const startTime = performance.now();

    const promises = [
      createTimedPromise(0),
      createTimedPromise(1),
      createTimedPromise(2),
    ];

    const results = await Promise.all(promises);
    const totalTime = (performance.now() - startTime) / 1000;

    // Remove "Loading..."
    output.innerHTML = "";

    // Add each promise's result row
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${result.name}</td>
        <td>${result.time.toFixed(3)}</td>
      `;
      output.appendChild(row);
    });

    // Add final "Total" row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${totalTime.toFixed(3)}</td>
    `;
    output.appendChild(totalRow);
  }

  // Call the function when the page loads
  window.onload = trackPromises;
</script>
