const ready = ()=> {
  const form = document.getElementById("api_document_form");
  const btn = document.getElementById("api_document_submit");
  const ref = document.getElementById('api_reference');
  const refMsg = document.getElementById("api_ref_msg");
  const year = document.getElementById("api_year");
  const allParts = document.getElementById("api_option_all_parts");
  const keepYear = document.getElementById("api_option_keep_year");
  const url = document.getElementById("api_url");
  const req = new XMLHttpRequest();
  const res = document.getElementById("api_document_result");

  const inputsBlock = (block) => {
    ref.disabled = block;
    year.disabled = block;
    allParts.disabled = block;
    keepYear.disabled = block;
    btn.disabled = block;
  }

  const reqListener = (e)=> {
    if (req.readyState === 4) {
      res.textContent = req.responseText;
      inputsBlock(false);
    }
  }

  req.onreadystatechange = reqListener;

  const update_url = (ev)=> {
    url.textContent = "https://api.relaton.org/api/v1/document?code=" + ref.value;
    if (year.value.trim() !== "") {
      url.textContent += "&year=" + year.value;
    }
    if (allParts.checked) {
      url.textContent += "&all_parts=true"
    }
    if (keepYear.checked) {
      url.textContent += "&keep_year=true"
    }
    url.textContent = encodeURI(url.textContent);
  }

  const submit = (el)=> {
    el.preventDefault();
    if (ref.value.trim() === "") {
      ref.focus();
      refMsg.style.display = "block";
    } else {
      inputsBlock(true);
      res.textContent = "Awaiting for results..."
      req.open("GET", url.textContent);
      req.send();
    }
  }

  ref.addEventListener("keyup", update_url);
  ref.addEventListener("focusout", (ev)=> {if (ref.value.trim() === "") { refMsg.style.display = "block"}});
  year.addEventListener("keyup", update_url);
  allParts.addEventListener("change", update_url);
  keepYear.addEventListener("change", update_url);
  form.addEventListener("submit", submit);
};

document.addEventListener('DOMContentLoaded', ready, false);