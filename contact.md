---
layout: default
title: Contact Bradly Sharpe
permalink: /contact/
atf: atf_contact.scss
---
<div>
	Required fields marked with <span class=".u-required">*</span>
</div>
<form name="contactForm" onsubmit="return validate(this);" method="post" action="submitContactForm.php">
  <div class="row">
    <div class="six columns">
      <label for="email">Email Address <span class=".u-required">*</span></label>
      <input class="u-full-width" type="email" placeholder="email@bradlysharpe.com.au" id="email" name="email" required="required">
    </div>
    <div class="six columns">
      <label for="reason">Reason for contacting <span class=".u-required">*</span></label>
      <select class="u-full-width" id="reason" name="reason" required="required">
        <option value="" disabled selected>Select your reason</option>
        <option value="general-question">General Question</option>
        <option value="project-enquiry">Project Enquiry</option>
        <option value="IT-problem">IT Problem</option>
        <option value="webmail-problem">Webmail Problem</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="six columns">
      <label for="fullname">Full Name <span class=".u-required">*</span></label>
      <input class="u-full-width" type="text" placeholder="Bradly Sharpe" id="fullname" name="fullname" required="required">
    </div>
    <div class="six columns">
      <label for="phone">Phone Number</label>
      <input class="u-full-width" type="text" placeholder="0403 567 735" id="phone" name="phone">
    </div>
  </div>
  <div class="row">
    <div class="twelve columns">
      <label for="message">Message <span class=".u-required">*</span></label>
      <textarea class="u-full-width" placeholder="Hi Bradly..." id="message" name="message" required="required"></textarea>
    </div>
  </div>
  <div class="row">
    <div class="six columns captcha"><div class="g-recaptcha" data-sitekey="6LdN6gITAAAAAOnRcQWgBHrvMg7DIIwOBQqsV4em"></div>&nbsp;</div>
    <div class="six columns">
      <input class="contact-reset" type="reset" value="Reset"><input class="button-primary" type="submit" value="Submit">
    </div>
  </div>
</form>
<script src='https://www.google.com/recaptcha/api.js'></script>
<script type="text/javascript">
  function validate(form) {
    try {
      var valid = validateFields(form);
      if (!valid)
        alert("Please enter valid data into all required fields");
      else {
        var xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action, true);
        xhr.send(new FormData(form));
        xhr.onerror = postError;
        xhr.onloadend = function () {
          if ("undefined" != typeof JSON) {
            var resp = JSON.parse(xhr.response);
            if (resp.sent) 
              postSuccess();
            else
              postError();
          } else {
            if (xhr.response.indexOf("{\"sent\":true") == 0) 
              postSuccess();
            else
              postError();
          }
        };
      }
    } catch (ex) {
      postError();
    }
    return false;
  }

  function postError() {
    alert("Sorry there was a problem submitting the form.\nPlease try again or call me on 0403 567 735");
  }

  function postSuccess() {
    var reason = getReasonField();
    if (reason)
      window.location.hash="reason=" + reason.value;
    window.location.pathname = "/thankyou";
  }

  function removeClass(el, className) {
    if (el && className) {
      var classes = el.className.split(" ");
      var newClasses = [];
      for (var i = 0 , l = classes.length; i < l; i++) {
        if (className != classes[i].toLowerCase())
          newClasses.push(classes[i]);
      };
      el.className = newClasses.join(" ");
    }
  }

  function getReasonField() {
    var elements = document.forms["contactForm"].elements;
    var reason = undefined;
    var count = 0;
    while ((reason == undefined) && (count < elements.length)) {
      if ("reason" == elements[count].name.toLowerCase()) 
        reason = elements[count];
      count++;
    }
    return reason;
  }

  function validateFields(form) {
    var valid = false;
    var invalidClass = "invalidField";
    try {
      if (form && form.name) {
        elements = document.forms[form.name].elements;
        if (elements && (0 < elements.length)) {
          valid = true;
          for (var i = 0, l = elements.length; i < l; i++) {
            var el = elements[i];
            var elValid = true;
            removeClass(el, invalidClass);
            if ((el.type.toLowerCase() == "text") || (el.tagName.toLowerCase() == "textarea")) {
              if (/^\s*$/.test(el.value)) elValid =  false;
            } else if (el.tagName.toLowerCase() == "select") {
              if (el.selectedIndex < 1) elValid = false;
            } else {
              switch (el.type) {
                case "email":
                    /* if (!/^[a-z0-9\-\.]+@[a-z0-9\-]{3,}(\.[a-z0-9\-]{2,})+/.test(el.value.toLowerCase())) elValid = false; */
                  break;
                case "submit":
                  break;
                case "reset":
                  break;
                default:
                  elValid = false;
                  break;
              }
            }
            if (!elValid && (el.getAttribute('required').toLowerCase() == 'required')) 
                el.className = el.className + " " + invalidClass;
            valid = valid && elValid;
          };
        }
      }
    } catch (ex) { }
    return valid;
  }

  if (0 < window.location.hash.length) {
    var reason = getReasonField();
    if (reason) {
      var hash = window.location.hash.substr(1);
      var hashPairs = hash.split("&");
      var reasonValue = undefined;
      for (var i = 0, l = hashPairs.length; i < l; i++) {
        hashKeyValue = hashPairs[i].split("=");
        if ((2 == hashKeyValue.length) && ("reason" == hashKeyValue[0].toLowerCase())) {
          var reasonValue = hashKeyValue[1].toLowerCase();
        }
      };

      if (reasonValue) {
        for (var j = 0, m = reason.children.length; j < m; j++) {
          var option = reason.children[j];
          option.removeAttribute("selected");
          if (option.value && (reasonValue == option.value.toLowerCase()))
            option.setAttribute("selected", "selected"); 
        };
      }
    }
    window.location.hash = "";
  }
</script>