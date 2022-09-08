async function newSiteFormHandler(event) {
  event.preventDefault();

  const website = document.querySelector('input[name="site-name"]').value;

  const response = await fetch("/api/sites", {
    method: "POST",
    body: JSON.stringify({
      website,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-site")
  .addEventListener("submit", newSiteFormHandler);
