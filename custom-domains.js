let store_url = "";
let domain = "";
let email = "";

const CUSTOM_DOMAIN_ROUTES = {
  STORE_URL: "store-url-section",
  CUSTOM_DOMAIN: "custom-domain-section",
  EMAIL_ADDRESS: "email-address-section",
  PROVISIONING: "provisioning-section",
  ERROR: "error-section",
  SETUP: "setup-section",
  SUCCESS: "success-section"
};

const provisionStorefront = () => {
  navigateTo(CUSTOM_DOMAIN_ROUTES.PROVISIONING);

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", (event) => {
    if (event.target.readyState === 4 && event.target.status === 200) {
      const response = JSON.parse(event.target.responseText);
      $('#aRecordHolder').innerHTML = response.a_record;
      $('#yourDomainHolder').innerHTML = domain;
      navigateTo(CUSTOM_DOMAIN_ROUTES.SETUP);
    } else {
      navigateTo(CUSTOM_DOMAIN_ROUTES.ERROR);
    }
  });

  xhr.open("POST", "https://api.ourshop.tools/api/store");
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.send(JSON.stringify({
    domain,
    store_url,
    email
  }));
}

navigateTo(CUSTOM_DOMAIN_ROUTES.STORE_URL);

$("#submit-store-url").addEventListener("submit", (event) => {
  event.preventDefault();
  store_url = event.target.storeURL.value;
  navigateTo(CUSTOM_DOMAIN_ROUTES.CUSTOM_DOMAIN);
});

$("#submit-custom-domain").addEventListener("submit", (event) => {
  event.preventDefault();
  domain = event.target.customDomain.value;
  navigateTo(CUSTOM_DOMAIN_ROUTES.EMAIL_ADDRESS);
});

$("#submit-email-address").addEventListener("submit", (event) => {
  event.preventDefault();

  email = event.target.emailAddress.value;

  provisionStorefront();
});

$("#skipEmail").addEventListener("click", () => {
  provisionStorefront();
});

$("#provisionDomain").addEventListener("click", () => {
  navigateTo(CUSTOM_DOMAIN_ROUTES.PROVISIONING);
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", (event) => {
    if (event.target.readyState === 4 && event.target.status === 200) {
      $("#provisionedDomainLink").innerHTML = domain;
      $("#provisionedDomainLink").href = `https://${domain}`;

      setTimeout(() => (navigateTo(CUSTOM_DOMAIN_ROUTES.SUCCESS)), 3000);
    } else {
      navigateTo(CUSTOM_DOMAIN_ROUTES.ERROR);
    }
  });

  xhr.open("GET", `https://api.ourshop.tools/api/provision?domain=${domain}`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.send();
})

$("#backToStoreURL").addEventListener("click", (event) => {
  event.preventDefault();
  navigateTo(CUSTOM_DOMAIN_ROUTES.STORE_URL);
})

$("#backToCustomDomain").addEventListener("click", (event) => {
  event.preventDefault();
  navigateTo(CUSTOM_DOMAIN_ROUTES.CUSTOM_DOMAIN);
})