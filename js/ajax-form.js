$(function () {
  // Get the form.
  var form = $("#contact-form");

  // Get the messages div.
  var formMessages = $(".ajax-response");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#contact-form input,#contact-form textarea").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! An error occured and your message could not be sent."
          );
        }
      });
  });
});

$(function () {
  console.log("✅ Appointment script loaded");

  // Attach submit handler to the INNER form
  $("#test-form").on("submit", function (e) {
    e.preventDefault();
    console.log("🟡 Form submit intercepted");

    // Collect values (based on your exact HTML)
    const date = $("#datepicker").val();
    const time = $("#timepicker").val();

    const service = $("#test-form select").eq(0).val();
    const barber = $("#test-form select").eq(1).val();

    const name = $("#test-form input[type='text']").eq(0).val();
    const phone = $("#test-form input[type='text']").eq(1).val();
    const email = $("#test-form input[type='email']").val();

    console.log("📥 Raw values:", {
      date,
      time,
      service,
      barber,
      name,
      phone,
      email,
    });

    // ---------- VALIDATION ----------
    if (!date) {
      console.warn("❌ Date missing");
      alert("Please select a date");
      return;
    }

    if (!time) {
      console.warn("❌ Time missing");
      alert("Please select a time");
      return;
    }

    if (!service || service.includes("Choose")) {
      console.warn("❌ Service not selected");
      alert("Please choose a service");
      return;
    }

    if (!barber || barber.includes("Choose")) {
      console.warn("❌ Barber not selected");
      alert("Please choose a barber");
      return;
    }

    if (!name || name.length < 2) {
      console.warn("❌ Invalid name");
      alert("Please enter your name");
      return;
    }

    if (!/^\+?\d{7,15}$/.test(phone)) {
      console.warn("❌ Invalid phone number");
      alert("Please enter a valid phone number");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.warn("❌ Invalid email");
      alert("Please enter a valid email address");
      return;
    }

    console.log("✅ Validation passed");

    // ---------- WHATSAPP MESSAGE ----------
    const message =
      `*New Barber Appointment*\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `📧 Email: ${email}\n` +
      `💈 Service: ${service}\n` +
      `✂ Barber: ${barber}\n` +
      `📅 Date: ${date}\n` +
      `⏰ Time: ${time}`;

    console.log("📨 WhatsApp message:", message);

    // ---------- WHATSAPP SEND ----------
    const barberWhatsApp = "2349150424598";
    const whatsappURL =
      "https://wa.me/" +
      barberWhatsApp +
      "?text=" +
      encodeURIComponent(message);

    console.log("🚀 Opening WhatsApp:", whatsappURL);

    window.open(whatsappURL, "_blank");

    $("#test-form")[0].reset();
    // Optional: close popup
    // $.magnificPopup.close();
  });
});
