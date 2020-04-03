import "whatwg-fetch";
const remoteFormWrapper = document.getElementById("contact-us");

const parseStringToHtml = (query: string) => (s: string) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(s, "text/html");
  return dom.querySelector(query);
};

const showSuccess = () => {
  document.querySelector("#form-sent")?.classList.remove("d-none");
  document.querySelector("#form-sent")?.classList.add("pulse");
};

const hideSuccess = () => {
  document.querySelector("#form-sent")?.classList.add("d-none");
  document.querySelector("#form-sent")?.classList.remove("pulse");
};

const showError = () => {
  document.querySelector("#form-sent-error")?.classList.remove("d-none");
  document.querySelector("#form-sent-error")?.classList.add("pulse");
};

const hideError = () => {
  document.querySelector("#form-sent-error")?.classList.add("d-none");
  document.querySelector("#form-sent-error")?.classList.remove("pulse");
};

const showForm = () => {
  document.querySelector("#contact-us")?.classList.remove("d-none");
};

const hideForm = () => {
  document.querySelector("#contact-us")?.classList.add("d-none");
};

const disableForm = () => {
  Array.from(
    document.querySelectorAll("#contact-us input, #contact-us select, #contact-us textarea")
  ).forEach(e => {
    e.setAttribute("disabled", "disabled");
  });
};

const enableForm = () => {
  Array.from(
    document.querySelectorAll("#contact-us input, #contact-us select, #contact-us textarea")
  ).forEach(e => {
    e.removeAttribute("disabled");
  });
};

const resetForm = () => {
  (document.querySelector("#contact-form")as HTMLFormElement)?.reset();
};

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

fetch("https://www.consol.com/request-sakuli/")
  .then(r => r.text())
  .then(parseStringToHtml("form.powermail_form"))
  .then(remoteForm => {
    const ourForm: HTMLFormElement | null = document.querySelector(
      "#contact-us form"
    );
    console.log("Fetched contact form")
    if (ourForm) {
      ourForm.action = remoteForm?.getAttribute("action") ?? ourForm.action;
      const remoteHiddens = remoteForm?.querySelectorAll(
        'input[type="hidden"]'
      );
      Array.from(remoteHiddens ?? []).forEach(hidden => {
        ourForm.prepend(hidden);
      });
      ourForm.addEventListener(
        "submit",
        e => {
          e.preventDefault();
          ourForm.setAttribute("disabled", "disabled");
          const formData = new FormData(ourForm);
          hideError();
          fetch(ourForm.action, {
            method: "POST",
            body: formData
          })
            .then(r => r.text())
            .then(parseStringToHtml(".powermail_message_error"))
            .then(responseHtml => {
              if (responseHtml) {
                throw responseHtml;
              }
            })
            .then(() => {
              showSuccess();
              resetForm();
              wait(5000).then(() => {
                hideSuccess();
                enableForm();
              });
            })
            .catch(e => {
              showError();
              enableForm();
            });
          return false;
        },
        false
      );
    }
  });

const dropDown = document.querySelector('#powermail_field_kundenwunsch');
const preSelectInterest = (ddValue: string) => {
  resetSelection()
  dropDown?.querySelector(`option[value="${ddValue}"]`)?.setAttribute('selected', 'selected')
}
const resetSelection = () => {
  Array.from(dropDown?.querySelectorAll('option') ?? []).forEach(option => option.removeAttribute('selected'))
}

const params = new URLSearchParams(window.location.search)
if (params.has('interest')) {
  preSelectInterest(params.get('interest')!)
}
