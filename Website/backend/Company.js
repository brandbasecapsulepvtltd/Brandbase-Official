// Company.js

const axios = require("axios");

// ------------------------------
// 1. PHISHARK CHECK
// ------------------------------
async function checkPhiShark(url, privateMode = false) {
  try {
    const res = await axios.post(
      "https://phishark.net/api/check-url",
      {
        url: url,
        private_mode: privateMode
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return {
      source: "PhiShark",
      probability: res.data.malicious_probability || 0,
      raw: res.data
    };

  } catch (err) {
    return {
      source: "PhiShark",
      probability: null,
      error: err.message
    };
  }
}

// ------------------------------
// 2. URLERT START SCAN
// ------------------------------
async function startURLertScan(url) {
  try {
    const res = await axios.post(
      "https://api.urlert.com/v1/scans",
      { url },
      {
        headers: {
          Authorization: "Bearer u_sk_your_api_token_here",   // replace
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.scan_id;

  } catch (err) {
    return null;
  }
}

// ------------------------------
// 3. URLERT GET RESULT
// ------------------------------
async function getURLertResult(scan_id) {
  try {
    const res = await axios.get(
      `https://api.urlert.com/v1/scans/${scan_id}`,
      {
        headers: {
          Authorization: "Bearer u_sk_your_api_token_here", // replace
        }
      }
    );

    // Example: result.malicious_score = 0.85 etc.
    return {
      source: "URLert",
      probability: res.data?.malicious_score ?? 0,
      raw: res.data
    };

  } catch (err) {
    return {
      source: "URLert",
      probability: null,
      error: err.message
    };
  }
}

// ------------------------------
// 4. MAIN FUNCTION — COMBINES BOTH
// ------------------------------
async function analyzeURL(url) {
  console.log("▶ Running PhiShark scan...");
  const phiSharkResult = await checkPhiShark(url);

  console.log("▶ Starting URLert scan...");
  const scan_id = await startURLertScan(url);

  let urlertResult;

  if (scan_id) {
    console.log("▶ URLert scan started. Waiting for result...");

    // Polling every 3 seconds until result is ready
    let status;
    do {
      await new Promise(r => setTimeout(r, 3000)); // wait 3 sec
      const res = await axios.get(
        `https://api.urlert.com/v1/scans/${scan_id}`,
        {
          headers: { Authorization: "Bearer u_sk_your_api_token_here" }
        }
      );
      status = res.data.status;
      if (status === "finished") {
        urlertResult = {
          source: "URLert",
          probability: res.data?.malicious_score ?? 0,
          raw: res.data
        };
        break;
      }
    } while (status !== "finished");
  } else {
    urlertResult = {
      source: "URLert",
      probability: null,
      error: "URLert scan could not start"
    };
  }

  // ------------------------------
  // Final score averaging
  // ------------------------------
  const probabilities = [phiSharkResult.probability, urlertResult.probability]
    .filter(v => typeof v === "number");

  const finalScore =
    probabilities.length > 0
      ? probabilities.reduce((a, b) => a + b) / probabilities.length
      : null;

  let verdict = "UNKNOWN";
  if (finalScore !== null) {
    if (finalScore < 0.3) verdict = "SAFE";
    else if (finalScore < 0.7) verdict = "SUSPICIOUS";
    else verdict = "DANGEROUS";
  }

  return {
    url,
    finalScore,
    verdict,
    details: [phiSharkResult, urlertResult]
  };
}

// ------------------------------
// RUN
// ------------------------------
analyzeURL("https://mavenox.com").then(console.log);
