const ready = ()=> {
  const form = document.getElementById("api_document_form");
  const btn = document.getElementById("api_document_submit");
  const ref = document.getElementById('api_reference');
  const ref_msg = document.getElementById("api_ref_msg");
  const year = document.getElementById("api_year");
  const all_parts = document.getElementById("api_option_all_parts");
  const keep_year = document.getElementById("api_option_keep_year");
  const url = document.getElementById("api_url");
  const req = new XMLHttpRequest();
  const res = document.getElementById("api_document_result");

  const reqListener = (e)=> {
    if (req.readyState === 4) {
      res.textContent = req.responseText;
      btn.disabled = false;
    }
  }

  req.onreadystatechange = reqListener;

  const update_url = (ev)=> {
    url.textContent = "https://api.relaton.org/api/v1/document?code=" + ref.value;
    if (year.value.trim() !== "") {
      url.textContent += "&year=" + year.value;
    }
    if (all_parts.checked) {
      url.textContent += "&all_parts=true"
    }
    if (keep_year.checked) {
      url.textContent += "&keep_year=true"
    }
    url.textContent = encodeURI(url.textContent);
  }

  const submit = (el)=> {
    el.preventDefault();
    if (ref.value.trim() === "") {
      ref.focus();
      ref_msg.style.display = "block";
    } else {
      btn.disabled = true;
      req.open("GET", url.textContent);
      req.send();
    }
  }

  ref.addEventListener("keyup", update_url);
  ref.addEventListener("focusout", (ev)=> {if (ref.value.trim() === "") { ref_msg.style.display = "block"}});
  year.addEventListener("keyup", update_url);
  all_parts.addEventListener("change", update_url);
  keep_year.addEventListener("change", update_url);
  form.addEventListener("submit", submit);
};

document.addEventListener('DOMContentLoaded', ready, false);