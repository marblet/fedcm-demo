async function triggerFedCM() {
  if (!("IdentityCredential" in window)) {
    // If the feature is available, take action
    console.log("FedCM is not supported in this browser.");
    return;
  }
  console.log("FedCM is supported in this browser.");

  const credential = await navigator.credentials.get({
    identity: {
      // Specify the IdP (or multiple IdPs, supported from Chrome 136) this Relying Party supports
      providers: [
        {
          configURL: "https://idp.local/config.json",
          clientId: "1234",
        },
      ],
    },
  });
  console.log({ credential });
}

triggerFedCM();
